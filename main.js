// FIXME:

	// Arrows are no longer positioned correctly after the page is resized
	//		Need to anchor the arrows horizontally relative to the page elements, not absolutely.

// TODO:

	// More entries!

	// Selected entry count somewhere on page?

	// Include an option for fuzzy matching?

	// Links to other terms from within descriptions

// Some global vars
var tagList = [],
	selectedTag = null,
	caseSensitiveSearch = false,
	searchWordDesc = true;

$(function(){

	var i, tagIndex;

	// Uncompress the dictionary
	uncompressDictionary();

	// Hide the arrows
	$('#searchArrow, #tagArrow').hide();

	// Refresh the entry list when the search box is edited
	$('#searchBox').bind('keyup',refreshAllEntries);

	// Accumulate a list of all tags that appear in the entries
	for(i=0;i<dict.length;i++){
		for(tagIndex=0;tagIndex<dict[i].tags.length;tagIndex++){
			if(tagList.indexOf(dict[i].tags[tagIndex]) < 0){
				tagList.push(dict[i].tags[tagIndex]);
			}
		}
	}

	// Sort the tag list
	tagList.sort();

	// Add the click handler to the "All" tag, which removes the selected tag
	$('#tag-all').click(function(e){
		// Remove the current selected tag class
		$('.tagSelected').removeClass('tagSelected');
		$(e.currentTarget).addClass('tagSelected');
		// Clear the selected tag
		selectedTag = null;
		// Hide the arrow
		hideTagArrow();
		// Refresh the entries
		refreshAllEntries();
	});

	// Get the tag list container, <p>
	var tagListP = $('#tagList')[0];

	// Create a click handler for the tag buttons
	var clickHandler = function(e){
		// Remove the current selected tag class
		$('.tagSelected').removeClass('tagSelected');
		// Get the tag index
		var index = e.currentTarget.id.split('-')[1];
		// Check if enabled/disabled
		if(tagList[index] === selectedTag){
			// Clear the selected tag
			selectedTag = null;
			// Hide the arrow
			hideTagArrow();
		}
		else{
			// Set the selected tag class
			e.currentTarget.className = 'tag tagSelected';
			selectedTag = tagList[index];
			// Show the tag arrow
			showTagArrow(e.currentTarget);
		}
		// Refresh the entries
		refreshAllEntries();
	};


	entries = [];

	// Loop through the tags
	for(tagIndex=0;tagIndex<tagList.length;tagIndex++){

		// Create the tag entry, <p>
		var tagListEntry = document.createElement('p');
		tagListEntry.className = 'tag';
		tagListEntry.id = 'tag-'+tagIndex;
		$(tagListEntry).text(tagList[tagIndex]);
		$(tagListEntry).click(clickHandler);
		tagListP.appendChild(tagListEntry);

		// Create a div for the entries

		var entrySection = document.createElement('div');
		entrySection.className = 'entrySection';
		entrySection.id = 'entrySection-'+tagIndex;
		$('#entries')[0].appendChild(entrySection);

		// Create a header in the entry list

		var entrySectionHeader = document.createElement('p');
		entrySectionHeader.className = 'entrySectionHeader';
		$(entrySectionHeader).text(tagList[tagIndex]);
		entrySection.appendChild(entrySectionHeader);

		// Loop through the entries
		for(i=0;i<dict.length;i++){

			// Check if the entry has the current tag
			if(dict[i].tags.indexOf(tagList[tagIndex]) > -1){

				var entry = dict[i];

				entries.push({
					i: i,
					words: entry.words,
					desc: entry.desc,
					tags: entry.tags
				});

				// Create the entry block
				var block = document.createElement('div');
				block.className = 'entryBlock';
				block.id = "entry"+(entries.length-1);
				entrySection.appendChild(block);

				// Create the word list for the entry
				var wordList = document.createElement('ul');
				wordList.className = 'entryWordList';
				block.appendChild(wordList);
		
				// Loop through the words
				for(var j=0;j<entry.words.length;j++){
	
					var word = entry.words[j];
	
					// Create the word element
					var wordLi = document.createElement('li');
					wordLi.className = 'entryWord';
					wordList.appendChild(wordLi);
	
					// Loop through the subwords
					for(var subWordIndex=0;subWordIndex<word.length-1;subWordIndex++){
						var subWordSpan = document.createElement('span');
						subWordSpan.className = 'entrySubWord';
						$(subWordSpan).text(word[subWordIndex]);
						if(subWordIndex < word.length-2)
							$(subWordSpan).text($(subWordSpan).text()+', ');
						wordLi.appendChild(subWordSpan);
					}
	
					if(typeof word[word.length-1] === 'string'){
		
						var wordDesc = document.createElement('p');
						wordDesc.className = 'entryWordDesc';
						$(wordDesc).text(word[word.length-1]);
						wordLi.appendChild(wordDesc);
		
					}
	
				}
	
				// Add the description if there is one
				if(entry.desc.length){
					var desc = document.createElement('p');
					desc.className = 'entryDesc';
					$(desc).text(entry.desc);
					block.appendChild(desc);
				}

			}

		}

	}

});

// Searching

function refreshAllEntries(){
	// Check if any tag is selected
	if(selectedTag !== null){
		// Yes, hide all but the selected tag
		$('.entrySection').hide();
		$('#entrySection-'+tagList.indexOf(selectedTag)).show();
	}
	else{
		// No, show every tag section
		$('.entrySection').show();
	}
	// Unhighlight any highlighted words
	unhighlightAll();
	// Check if filtering entries
	if($('#searchBox').val()){
		// Show the search arrow
		showSearchArrow();
		// Show the entries
		showSearchedEntries();
	}
	else{
		// Hide the search arrow
		hideSearchArrow();
		// Show all the entries
		showAll();
	}
}

function showSearchedEntries(){
	var i, wordI, tagI, entryVisible,
		visibleTags = [],
		filter = $('#searchBox').val();
	// Loop through the entries
	for(i=0;i<entries.length;i++){
		// Cache the entry
		var entry = entries[i];
		// Keep a flag denoting if the entry is visible
		entryVisible = false;
		// Loop through each word in the entry
		for(var wordIndex=0;wordIndex<entry.words.length;wordIndex++){
			// Check if the word is visible
			if(doesWordMatch(entry.words[wordIndex],filter)){
				// Highlight the word and set the entry as visible
				$($('#entry'+i)[0].children[0].children[wordIndex]).addClass('entryWordHighlighted');
				entryVisible = true;
			}
		}
		// Show or hide the entry
		if(entryVisible){
			showEntry(i);
		}
		else{
			hideEntry(i);
		}
	}
}

function isEntrySectionVisible(entry){
	// Return true if all tags are selected
	if(selectedTag === null){
		return true;
	}
	// Else loop through the entry's tags
	for(var i=0;i<entry.tags.length;i++){
		// Return true if it matches the selected tag
		if(selectedTag === entry.tags[i]){
			return true;
		}
	}
	// Else no matches, return false
	return false;
}

function doesWordMatch(word,filter){
	// Loop though each word, minus 1 for the description
	for(var i=0;i<word.length-1;i++){
		// Return true if its visible per the search
		if(doesStringMatch(word[i],filter)){
			return true;
		}
	}
	// Search the word desc
	if(searchWordDesc && word[word.length-1] !== null && doesStringMatch(word[word.length-1],filter)){
		return true;
	}
	// Else no matches, return false
	return false;
}

function doesStringMatch(string,filter){
	// Use indexOf if case sensitive, else use a case insensitive RegExp
	return (caseSensitiveSearch ? string.indexOf(filter) : string.search(new RegExp(filter,'i'))) >= 0;
}

function unhighlightAll(){
	// Remove the highlighted class
	$('.entryWordHighlighted').removeClass('entryWordHighlighted');
}

// Arrow Hiding/Showing

function showSearchArrow(){
	// Get the sidebar element
	var sidebar = $('#sidebar')[0];
	// Position and show the arrow
	var searchBox = $('#searchBox');
	var searchArrow = $('#searchArrow');
	searchArrow[0].style.left = sidebar.offsetLeft+sidebar.offsetWidth-16+'px';
	searchArrow[0].style.top = searchBox[0].offsetTop+searchBox[0].offsetHeight/2-16+'px';
	searchArrow.show();
}

function hideSearchArrow(){
	$('#searchArrow').hide();
}

function showTagArrow(target){
	// Get the sidebar element
	var sidebar = $('#sidebar')[0];
	// Position and show the arrow
	var arrow = $('#tagArrow');
	arrow[0].style.top = target.offsetTop+target.offsetHeight/2-16+'px';
	arrow[0].style.left = sidebar.offsetLeft+sidebar.offsetWidth-16+'px';
	arrow.show();
}

function hideTagArrow(){
	$('#tagArrow').hide();
}

// Entry Hiding/Showing

function showEntry(index){
	$('#entry'+index).show();
}

function hideEntry(index){
	$('#entry'+index).hide();
}

function hideAll(){
	$('.entryBlock').hide();
}

function showAll(){
	$('.entryBlock').show();
}

// Dictionary manipulation

function uncompressDictionary(){
	// Loop through the entries
	for(var i=0;i<dict.length;i++){
		// Cache the entry
		var entry = dict[i];
		// Expand a single word into a subword array
		if(typeof entry.word === 'string'){
			entry.words = [[entry.word,null]];
			delete entry.word;
		}
		// Expand a single word array into a subword array
		else if(typeof entry.word === 'object'){
			entry.words = [entry.word];
			delete entry.word;
		}
		// Add null descriptions to single subwords and expand single words
		else{
			for(var wordI=0;wordI<entry.words.length;wordI++){
				if(typeof entry.words[wordI] === 'string'){
					entry.words[wordI] = [entry.words[wordI],null];
				}
				else if(entry.words[wordI].length === 1){
					entry.words[wordI].push(null);
				}
			}
		}
		// Set an empty tag array if undefined
		if(typeof entry.tags === 'undefined'){
			console.warn('Dictionary entry '+i+' is without tag array');
			entry.tags = [];
		}
		// Set an empty description if undefined
		if(typeof entry.desc === 'undefined'){
			entry.desc = '';
		}
	}
}
