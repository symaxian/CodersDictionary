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

	searchWordMeaning: true,

	editMode: false,

	urlParams: null,

		// Data

	entries: null,

	hoveredEntry: null,

	tagList: null,

	selectedTag: null,

	selectedTagIndex: -1,

		// Methods

	getUrlParameters: function(){
		for(var i=0, vars = {}, param, paramArray = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');i<paramArray.length;i++){
			param = paramArray[i].split('=');
			vars[param[0]] = param[1];
		}
		return vars;
	},

	init: function(){

		// Uncompress the dictionary
		coders.uncompressDictionary();

		// Get the params
		coders.urlParams = coders.getUrlParameters();
		coders.editMode = coders.urlParams.edit === 'true';

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
					coders.rebuildPage();
				}
				else if(e.keyCode === 107){
					// Numeric +
					dict[index].words.push(['<word>','<desc>']);
					coders.rebuildPage();
				}
				else if(e.keyCode === 13 && !dict[index].desc){
					// Numeric Enter
					dict[index].desc = '<desc>';
					coders.rebuildPage();
				}
			});
		}

		// Insert the entries onto the page
		coders.rebuildPage();

	},

	scrollToTerm: function(term){
		coders.scrollToTermAt(coders.indexOfTerm(term));
	},

	scrollToTermAt: function(index){
		$('html, body').animate({
			scrollTop: $("#entry"+index).offset().top
		}, 100);
	},

	rebuildPage: function(){

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

		var termEdit = function(){
			// Get the properties
			var text = $(this).text();
			var index = parseInt($(this).attr('data-index'),10);
			// Set the text, or delete the word if there is no text
			if(text.length){
				dict[index].term = text;
			}
			else{
				// No text, delete the term
				dict.splice(index,1);
				// Rebuild the page
				coders.rebuildPage();
			}
		};

		var mainMeaningValueEdit = function(){
			var index = parseInt($(this).attr('data-index'),10);
			var value = $(this).text();
			if(!value.length){
				value = '< universal meaning >';
			}
			dict[index].meaning = value;
			coders.rebuildPage();
		};

		var meaningContextEdit = function(){
			var index = parseInt($(this).attr('data-index'),10);
			var oldKey = $(this).attr('data-key');
			var newKey = $(this).text();
			if(newKey.length){
				var value = dict[index].meanings[oldKey];
				dict[index].meanings[newKey] = value;
				delete dict[index].meanings[oldKey];
				$(this).attr('data-key',newKey);
			}
			else{
				delete dict[index].meanings[oldKey];
				coders.rebuildPage();
			}
		};

		var defMeaningEdit = function(){
			var index = parseInt($(this).attr('data-index'),10);
			var key = $(this).attr('data-key');
			var value = $(this).text();
			if(value.length){
				value = dict[index].meanings[key];
				dict[index].meanings[key] = value;
			}
			else{
				delete dict[index].meanings[key];
				coders.rebuildPage();
			}
		};

		var seeAlsoClick = function(){
			coders.scrollToTerm($(this).text());
		};

		var seeAlsoEdit = function(){
			var index = parseInt($(this).attr('data-index'),10);
			var seeAlsoIndex = $(this).attr('data-seealso-index');
			var value = $(this).text();
			if(value.length){
				dict[index].seeAlso[seeAlsoIndex] = value;
			}
			else{
				dict[index].seeAlso.splice(seeAlsoIndex,1);
				coders.rebuildPage();
			}
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
		for(var entryI=0;entryI<dict.length;entryI++){

			var entry = dict[entryI];

			// Create the entry block
			var block = document.createElement('div');
			block.className = 'entryBlock';
			block.id = 'entry'+entryI;
			$(block).attr('data-entry-index',entryI);
			$(block).hover(entryHoverHandler);
			$('#entries')[0].appendChild(block);
			// Add a title if editable
			if(coders.editMode){
				block.title = 'Entry: '+i;
			}

			// Term
			var term = document.createElement('p');
			term.className = 'entryTerm';
			term.innerText = entry.term;
			block.appendChild(term);
			if(coders.editMode){
				$(term).
					attr('contentEditable','true').
					attr('data-index',entryI).
					blur(termEdit);
			}

			// Meaning list, <dl>
			var entryMeaningList = document.createElement('dl');
			entryMeaningList.className = 'entryMeaningList';
			block.appendChild(entryMeaningList);

			// Main meaning
			var meaningContext = document.createElement('dt');
			meaningContext.className = 'entryMeaningContext';
			entryMeaningList.appendChild(meaningContext);

			var meaningValue = document.createElement('dd');
			meaningValue.className = 'entryMeaningValue';
			meaningValue.innerText = entry.meaning;
			entryMeaningList.appendChild(meaningValue);
			if(coders.editMode){
				$(meaningValue).
					attr('contentEditable','true').
					attr('data-index',entryI).
					blur(mainMeaningValueEdit);
			}

			// Loop through the meanings
			for(var context in entry.meanings){

				// dt
				meaningContext = document.createElement('dt');
				meaningContext.className = 'entryMeaningContext';
				meaningContext.innerText = context;
				entryMeaningList.appendChild(meaningContext);
				if(coders.editMode){
					var myEntry = entry;
					var myIndex = i;
					$(meaningContext).
						attr('contentEditable','true').
						attr('data-index',entryI).
						attr('data-key',context).
						blur(meaningContextEdit);
				}

				// dd
				meaningValue = document.createElement('dd');
				meaningValue.className = 'entryMeaningValue';
				meaningValue.innerText = entry.meanings[context];
				entryMeaningList.appendChild(meaningValue);
				if(coders.editMode){
					$(meaningValue).
						attr('contentEditable','true').
						attr('data-index',entryI).
						attr('data-key',context).
						blur(defMeaningEdit);
				}

			}

			// Check for any "See Also" terms
			if(entry.seeAlso.length){

				var seeAlsoP = document.createElement('p');
				block.appendChild(seeAlsoP);

				var seeAlsoHeader = document.createElement('span');
				seeAlsoHeader.className = 'seeAlsoHeader';
				$(seeAlsoHeader).text('See Also: ');
				seeAlsoP.appendChild(seeAlsoHeader);

				// Loop through the seeAlso's
				for(var i=0;i<entry.seeAlso.length;i+=2){

					var seeAlsoTerm = document.createElement('span');
					seeAlsoTerm.className = 'seeAlsoTerm';
					seeAlsoTerm.innerText = entry.seeAlso[i];
					seeAlsoP.appendChild(seeAlsoTerm);
					if(coders.editMode){
						$(seeAlsoTerm).
							attr('contentEditable','true').
							attr('data-index',entryI).
							attr('data-seeAlso-index',i).
							blur(seeAlsoEdit);
					}
					else{
						$(seeAlsoTerm).click(seeAlsoClick);
					}

					if(i < entry.seeAlso.length-2){
						var temp = document.createElement('span');
						$(temp).text(', ');
						seeAlsoP.appendChild(temp);
					}

				}

			}

			if(coders.editMode){

				// Add meaning link
				var addMeaningLink = document.createElement('a');
				addMeaningLink.className = 'editLink';
				$(addMeaningLink).text('Add meaning');
				$(addMeaningLink).attr('data-index',entryI);
				$(addMeaningLink).click(function(){
					var index = parseInt($(this).attr('data-index'),10);
					coders.addMeaningAt(index,'< context >','< meaning within that context >');
					coders.rebuildPage();
				});
				block.appendChild(addMeaningLink);

				// Add seeAlso link
				var addSeeAlsoLink = document.createElement('a');
				addSeeAlsoLink.className = 'editLink';
				$(addSeeAlsoLink).text(' - Add see-also term');
				$(addSeeAlsoLink).attr('data-index',entryI);
				$(addSeeAlsoLink).click(function(){
					var index = parseInt($(this).attr('data-index'),10);
					coders.addSeeAlsoAt(index,'< term >');
					coders.rebuildPage();
				});
				block.appendChild(addSeeAlsoLink);

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
			// Check if the word matches
			if(coders.doesStringMatch(entry.term,filter)){
				// Highlight the word and set the entry as visible
				$($('#entry'+i)[0].childNodes[0]).addClass('entryBlockHighlighted');
				entryVisible = true;
			}
			// Check if the meaning matches
			if(coders.searchWordMeaning && coders.doesStringMatch(entry.meaning,filter)){
				// Highlight the word and set the entry as visible
				$($('#entry'+i)[0].childNodes[1]).addClass('entryBlockHighlighted');
				entryVisible = true;
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

	indexOfTerm: function(term){
		for(var i=0;i<dict.length;i++){
			if(dict[i].term === term){
				return i;
			}
		}
		return -1;
	},

	updateTermAt: function(index,term){
		dict[index].term = term;
	},

	setMainMeaningAt: function(index,meaning){
		dict[index].meaning = meaning;
	},

	addMeaningAt: function(index,context,meaning){
		dict[index].meanings[context] = meaning;
	},

	addSeeAlsoAt: function(index,term){
		dict[index].seeAlso.push(term);
	},

	uncompressDictionary: function(){
		// Loop through the entries
		for(var i=0;i<dict.length;i++){
			var entry = dict[i];
			// Set empty meanings if undefined
			if(typeof entry.meanings === 'undefined'){
				entry.meanings = {};
			}
			// Set empty seeAlso if undefined
			if(typeof entry.seeAlso === 'undefined'){
				entry.seeAlso = [];
			}
		}
	},

	exportDictionary: function(){
		// TODO: Dictionary compression
		window.open('data:text/json;charset=utf-8,var dict='+JSON.stringify(dict)+';');
	}

};

$(coders.init);