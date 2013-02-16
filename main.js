// TODO:

	// More entries!

	// Find a way to sort entries, or reduce each entry to a single main word for sorting

	// Selected entry count somewhere on page?

	// Include an option for fuzzy matching?

	// Links to other terms from within descriptions

	// Arrows should be anchored relative to the page elements, not absolutely.

coders = {

		// Settings

	caseSensitiveSearch: false,

	searchWordDesc: true,

	editMode: false,

		// Data

	entries: null,

	hoveredEntry: null,

	tagList: null,

	selectedTag: null,

	selectedTagIndex: -1,

		// Methods

	warn: function(msg){
		if(typeof console === 'object'){
			console.warn('CodersDictionary: '+msg);
		}
	},

	init: function(){

		// Uncompress the dictionary
		coders.uncompressDictionary();

		// Hide the arrows
		$('#searchArrow, #tagArrow').hide();

		// Refresh the entry list when the search box is edited
		$('#searchBox').bind('keyup',coders.refreshAllEntries);

		// Add the click handler to the "All" tag, which removes the selected tag
		$('#tag-all').click(function(e){
			coders.selectTag(null);
		});

		window.onresize = function(){
			coders.updateSearchArrow();
			coders.updateTagArrow();
		};

		if(coders.editMode){
			document.addEventListener('keydown',function(e){
				var index = coders.hoveredEntry;
				if(e.keyCode === 109){
					// Numeric -
					dict.push({
						words: [['<word>','<desc>']],
						desc: '<desc>',
						tags: ['<tag>']
					});
					coders.updatePageEntries();
				}
				else if(e.keyCode === 107){
					// Numeric +
					dict[index].words.push(['<word>','<desc>']);
					coders.updatePageEntries();
				}
				else if(e.keyCode === 13 && !dict[index].desc){
					// Numeric Enter
					dict[index].desc = '<desc>';
					coders.updatePageEntries();
				}
			});
		}

		// Insert the entries onto the page
		coders.updatePageEntries();

	},

	updatePageEntries: function(){

		// Empty the tags and entries
		$('#tagList').empty();
		$('#entries').empty();

		// Accumulate a list of all tags that appear in the entries
		coders.tagList = [];
		for(i=0;i<dict.length;i++){
			for(tagIndex=0;tagIndex<dict[i].tags.length;tagIndex++){
				if(coders.tagList.indexOf(dict[i].tags[tagIndex]) < 0){
					coders.tagList.push(dict[i].tags[tagIndex]);
				}
			}
		}

		// Sort the tag list
		coders.tagList.sort();

		// Construct the page again
		coders.insertPageEntries();

		// Re-select the previously selected tag
		coders.selectTag(coders.selectedTag);

	},

	insertPageEntries: function(){
 
		// Get the tag list container, <p>
		var tagListDiv = $('#tagList')[0];

		var tagClickHandler = function(e){
			coders.selectTag($(this).text());
		};

		var entryHoverHandler = function(e){
			coders.hoveredEntry = parseInt($(this).attr('data-entry-index'),10);
		};

		var wordEditHandler = function(e){
			// Get the properties
			var text = $(this).text();
			var entryIndex = parseInt($(this).attr('data-entry-index'),10);
			var wordIndex = parseInt($(this).attr('data-word-index'),10);
			// Set the text, or delete the word if there is no text
			if(text.length){
				dict[entryIndex].words[wordIndex][0] = text;
			}
			else{
				// No text, delete the word
				dict[entryIndex].words.splice(wordIndex,1);
				// Delete the entry if there are no words left
				if(dict[entryIndex].words.length === 0){
					dict.splice(entryIndex,1);
				}
				// Rebuild the page
				coders.updatePageEntries();
			}
		};

		var wordDescEditHandler = function(e){
			// Get the properties
			var text = $(this).text();
			var entryIndex = parseInt($(this).attr('data-entry-index'),10);
			var wordIndex = parseInt($(this).attr('data-word-index'),10);
			// Set the text, or null
			if(text.length === 0){
				text = null;
			}
			dict[entryIndex].words[wordIndex][1] = text;
			if(text === null){
				coders.updatePageEntries();
			}
		};

		var descEditHandler = function(e){
			// Get the properties
			var text = $(this).text();
			var entryIndex = parseInt($(this).attr('data-entry-index'),10);
			// Set the text
			dict[entryIndex].desc = text;
		};

		var tagsEditHandler = function(e){
			// Get the properties
			var entryIndex = parseInt($(this).attr('data-entry-index'),10);
			var tags = $(this).text().split(',');
			// Trim the tags
			for(var i=0;i<tags.length;i++){
				tags[i] = $.trim(tags[i]);
			}
			// Set the tags
			dict[entryIndex].tags = tags;
			coders.updatePageEntries();
		};

		// Loop through the tags
		for(var tagIndex=0;tagIndex<coders.tagList.length;tagIndex++){

			// Create the tag list entry, <p>
			var tagListEntry = document.createElement('p');
			tagListEntry.className = 'tag';
			tagListEntry.id = 'tag-'+tagIndex;
			$(tagListEntry).text(coders.tagList[tagIndex]);
			$(tagListEntry).click(tagClickHandler);
			tagListDiv.appendChild(tagListEntry);

		}

		// Loop through the entries
		for(var i=0;i<dict.length;i++){

			var entry = dict[i];

			// Create the entry block
			var block = document.createElement('div');
			block.className = 'entryBlock';
			block.id = 'entry'+i;
			$(block).attr('data-entry-index',i);
			$(block).hover(entryHoverHandler);
			$('#entries')[0].appendChild(block);
			// Add a title if editable
			if(coders.editMode){
				block.title = 'Entry: '+i;
			}

			// Create the word list for the entry
			var wordList = document.createElement('ul');
			wordList.className = 'entryWordList';
			block.appendChild(wordList);
	
			// Loop through the words
			for(var j=0;j<entry.words.length;j++){

				var word = entry.words[j];

				// Create the word block element
				var wordBlock = document.createElement('li');
				wordBlock.className = 'entryWordBlock';
				wordList.appendChild(wordBlock);

				// Create a span for the word
				var wordSpan = document.createElement('span');
				// Set the class and text, add it to the word block
				wordSpan.className = 'entryWord';
				$(wordSpan).text(word[0]);
				wordBlock.appendChild(wordSpan);
				// Add dictionary data if editable
				if(coders.editMode){
					$(wordSpan).attr('contentEditable','true');
					$(wordSpan).attr('data-entry-index',i);
					$(wordSpan).attr('data-word-index',j);
					$(wordSpan).blur(wordEditHandler);
				}

				// Check for a description
				if(word[1] !== null){
					// Create a <p> for the descrption
					var wordDesc = document.createElement('p');
					// Set the class and text, add it to the word block
					wordDesc.className = 'entryWordDesc';
					$(wordDesc).text(word[word.length-1]);
					wordBlock.appendChild(wordDesc);
					// Add dictionary data if editable
					if(coders.editMode){
						$(wordDesc).attr('contentEditable','true');
						$(wordDesc).attr('data-entry-index',i);
						$(wordDesc).attr('data-word-index',j);
						$(wordDesc).blur(wordDescEditHandler);
					}
				}

			}

			// Add the description if there is one
			if(entry.desc.length){
				var desc = document.createElement('p');
				desc.className = 'entryDesc';
				$(desc).text(entry.desc);
				block.appendChild(desc);
				// Add dictionary data if editable
				if(coders.editMode){
					$(desc).attr('contentEditable','true');
					$(desc).attr('data-entry-index',i);
					$(desc).blur(descEditHandler);
				}
			}

			// Add the tags
			var tags = document.createElement('p');
			tags.className = 'entryTags';
			$(tags).text(entry.tags.sort().join(', '));
			block.appendChild(tags);
			// Add dictionary data if editable
			if(coders.editMode){
				$(tags).attr('contentEditable','true');
				$(tags).attr('data-entry-index',i);
				$(tags).blur(tagsEditHandler);
			}

		}

	},

	selectTag: function(name){
		var index = coders.tagList.indexOf(name);
		$('.tagSelected').removeClass('tagSelected');
		if(name === null || index === -1){
			// Null or invalid, select "All"
			coders.selectedTag = null;
			coders.selectedTagIndex = -1;
			$('#tag-all').addClass('tagSelected');
			$('#header').text('All terms');
		}
		else{
			// Valid tag name, select it
			coders.selectedTag = name;
			coders.selectedTagIndex = index;
			$('#tag-'+index).addClass('tagSelected');
			$('#header').text('Tag: '+name);
		}
		coders.updateTagArrow();
		coders.refreshAllEntries();
	},

	// Searching

	refreshAllEntries: function(){

		var filter = $('#searchBox').val();
		var hasFilter = filter.length > 0;

		coders.unhighlightAll();

		for(var i=0;i<dict.length;i++){
			var entry = dict[i];
			if(coders.selectedTag !== null && entry.tags.indexOf(coders.selectedTag) === -1){
				$('#entry'+i).hide();
				continue;
			}
			if(!hasFilter){
				$('#entry'+i).show();
				continue;
			}
			// Keep a flag denoting if the entry is visible
			var entryVisible = false;
			// Loop through each word in the entry
			for(var wordI=0;wordI<entry.words.length;wordI++){
				// Check if the word is visible
				if(coders.doesWordMatch(entry.words[wordI],filter)){
					// Highlight the word and set the entry as visible
					$($('#entry'+i)[0].childNodes[0].childNodes[wordI]).addClass('entryBlockHighlighted');
					entryVisible = true;
				}
			}
			// Show or hide the entry
			if(entryVisible){
				$('#entry'+i).show();
			}
			else{
				$('#entry'+i).hide();
			}
		}
	},

	doesWordMatch: function(word,filter){
		// Check the word itself
		if(coders.doesStringMatch(word[0],filter)){
			return true;
		}
		// Search the word desc
		return coders.searchWordDesc && word[1] !== null && coders.doesStringMatch(word[1],filter);
	},

	doesStringMatch: function(string,filter){
		// Use indexOf if case sensitive, else use a case insensitive
		return (coders.caseSensitiveSearch ? string.indexOf(filter) : string.search(new RegExp(filter,'i'))) >= 0;
	},

	unhighlightAll: function(){
		// Remove the highlighted class
		$('.entryBlockHighlighted').removeClass('entryBlockHighlighted');
	},

	// Arrow Hiding/Showing

	updateSearchArrow: function(){
		var searchBox = $('#searchBox');
		if(searchBox.val().length){
			// Get the sidebar element
			var sidebar = $('#sidebar')[0];
			// Position and show the arrow
			var searchArrow = $('#searchArrow');
			searchArrow[0].style.left = sidebar.offsetLeft+sidebar.offsetWidth-16+'px';
			searchArrow[0].style.top = searchBox[0].offsetTop+searchBox[0].offsetHeight/2-16+'px';
			searchArrow.show();
		}
		else{
			$('#searchArrow').hide();
		}
	},

	updateTagArrow: function(){
		if(coders.selectedTag === null){
			$('#tagArrow').hide();
		}
		else{
			var target = $('#tag-'+coders.selectedTagIndex)[0];
			// Get the sidebar element
			var sidebar = $('#sidebar')[0];
			// Position and show the arrow
			var arrow = $('#tagArrow');
			arrow[0].style.top = target.offsetTop+target.offsetHeight/2-16+'px';
			arrow[0].style.left = sidebar.offsetLeft+sidebar.offsetWidth-16+'px';
			arrow.show();
		}
	},

	// Dictionary manipulation

	uncompressDictionary: function(){
		// Loop through the entries
		for(var i=0;i<dict.length;i++){
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
			// Check for a tags array
			if(!(entry.tags instanceof Array)){
				// Check for a single tag if not defined
				if(typeof entry.tag === 'string'){
					entry.tags = [entry.tag];
					delete entry.tag;
				}
				// Else no tags, print a warning
				else{
					coders.warn('Dictionary entry '+i+' is without tag string or tags array');
					entry.tags = [];
				}
			}
			// Set an empty description if undefined
			if(typeof entry.desc === 'undefined'){
				entry.desc = '';
			}
		}
	},

	exportDictionary: function(){
		// TODO: Dictionary compression
		window.open('data:text/json;charset=utf-8,'+JSON.stringify(dict));
	}

};

$(coders.init);