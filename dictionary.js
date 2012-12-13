var dict = [
	{
		words: [
			'class',
			'prototype'
		],
		desc: 'A template for an object.',
		tags: ['Objects']
	},
	{
		words: [
			'interface',
			'protocol',
			'specification'
		],
		desc: 'A set of parameters that an object/class may comply with. If so then that object/class is said to implement that interface/protocol/specification.',
		tags: ['Objects']
	},
	{
		words: [
			'member',
			['attr','attribute','Usually refers to metadata'],
			['field','Usually refers to a variable'],
			['prop','property','Usually refers to a variable']
		],
		desc: 'A piece of data/code associated with a specific object.',
		tags: ['Objects']
	},
	{
		word: ['ptr','pointer',null],
		desc: 'Points to a location in memory.',
		tags: ['Memory']
	},
	{
		word: ['ref','reference',null],
		desc: 'Refers to another item.',
		tags: ['Reference']
	},
	{
		words: [
			'list',
			'array',
			'vector',
			['stack','Usually describes the functionality that the data structure is used for']
		],
		desc: 'Common names for linear data structures.',
		tags: ['Data Structure']
	},
	{
		word: ['col','column',null],
		desc: 'Refers to the column of a table.',
		tags: ['Data Structure']
	},
	{
		word: 'row',
		desc: 'Refers to the row of a table.',
		tags: ['Data Structure']
	},
	{
		words: [
			'this',
			'self'
		],
		desc: 'A reference to the current scope.',
		tags: ['Reference']
	},
	{
		words: [
			['pos','position',null],
			['origin','Usually from where the object "begins", such as the top-left corner on modern display coordinate systems']
		],
		tags: ['Visual']
	},
	{
		words: [
			'x',
			['h','horz','horizontal',null]
		],
		desc: 'An objects horizontal position on a 2d plane.',
		tags: ['Visual']
	},
	{
		words: [
			'y',
			['v','vert','vertical',null]
		],
		desc: 'An objects vertical position on a 2d plane.',
		tags: ['Visual']
	},
	{
		words: [
			'xScale',
			['hScale','horizontalScale',null]
		],
		desc: 'An objects horizontal scale.',
		tags: ['Visual']
	},
	{
		words: [
			'yScale',
			['vScale','verticalScale',null]
		],
		desc: 'An objects vertical scale.',
		tags: ['Visual']
	},
	{
		words: [
			'angle',
			['r','rotation',null]
		],
		desc: 'An objects rotation.',
		tags: ['Visual']
	},
	{
		word: ['id','identifier',null],
		desc: 'A unique identifier for an object.',
		tags: ['Reference']
	},
	{
		words: [
			'slot',
			'element'
		],
		desc: 'A set place for data in a structure.',
		tags: ['Data Structure']
	},
	{
		words: [
			'draw',
			'paint',
			'render',
			'output'
		],
		desc: 'Draw some image/shape onto a destination.',
		tags: ['Visual']
	},
	{
		words: [
			['cpy','copy',null],
			'clone',
			'duplicate'
		],
		tags: ['Method Names']
	},
	{
		word: ['var','variable',null],
		desc: 'A piece of data.',
		tags: ['Reference']
	},
	{
		words: [
			['i','index','Usually a number'],
			['itr','iterator','Usually an object']
		],
		desc: 'An item that iterates(moves incrementally) over a linear data structure.',
		tags: ['Data Structure']
	},
	{
		word: 'child',
		desc: 'Describes an item that is a descendant or sub-item of its parent.',
		tags: ['Data Structure','Trees']
	},
	{
		word: 'parent',
		desc: 'Describes an item that has a child.',
		tags: ['Data Structure','Trees']
	},
	{
		words: [
			'node',
			'element'
		],
		desc: 'A discrete piece of a structure.',
		tags: ['Data Structure','Trees']
	},
	{
		word: 'leaf node',
		desc: 'A node on a tree that has no children.',
		tags: ['Trees']
	},
	{
		words: [
			'root',
			'root node',
			'origin'
		],
		desc: 'The root node of a tree, from which all other nodes descend.',
		tags: ['Trees']
	},
	{
		word: 'breadth-first',
		desc: 'A method of traversing a tree that involves moving across to neighboring nodes before descending to child nodes.',
		tags: ['Trees']
	},
	{
		word: 'depth-first',
		desc: 'A method of traversing a tree that involves descending as far as possible from the root node before backtracking and descending along the next path.',
		tags: ['Trees']
	},
	{
		word: 'collapse',
		tags: ['Trees']
	},
	{
		word: ['addr','address',null],
		desc: 'A location in memory.',
		tags: ['Memory']
	},
	{
		word: ['mem','memory',null],
		desc: 'A set range of slots that hold data.',
		tags: ['Memory']
	},
	{
		word: ['buf','buffer',null],
		desc: 'A piece of memory, usually allocated to hold a specific piece/size of data.',
		tags: ['Memory','Data Structure']
	},
	{
		word: ['str','string',null],
		desc: 'A set length of bytes/characters.',
		tags: ['Data Structure']
	},
	{
		words: [
			'print',
			'output',
			'display',
			'write'
		],
		desc: 'Output a piece of text to the display.',
		tags: ['Method Names']
	},
	{
		words: [
			['func','function',null],
			['routine','subroutine',null],
			['proc','procedure',null],
			'task'
		],
		desc: 'A subroutine of code that performs a specific task',
		tags: ['Functions']
	},
	{
		word: 'method',
		desc: 'A function that belongs to and acts on a particular object.\nSuch as an instance of a class.',
		tags: ['Functions','Objects']
	},
	{
		word: 'getter',
		desc: 'A method that returns a property of an object.\nA getter is an accessor method.',
		tags: ['Functions','Objects']
	},
	{
		word: 'setter',
		desc: 'A method that sets a property of an object.\nA setter is a mutator method.',
		tags: ['Functions','Objects']
	},
	{
		word: 'accessor',
		desc: 'A method that only accesses and does not modify the object it is called on.',
		tags: ['Functions','Objects']
	},
	{
		word: 'mutator',
		desc: 'A method that modifies the object it is called on.',
		tags: ['Functions','Objects']
	},
	{
		words: [
			['arg','argument',null]
		],
		desc: 'A value passed into a function.',
		tags: ['Functions']
	},
	{
		words: [
			['param','parameter',null]
		],
		desc: 'A placeholder for values passed into a function.',
		tags: ['Functions']
	},
	{
		words: [
			'constructor',
			['init','initiator',null]
		],
		desc: 'A method that initiates an object. Usually involves setting initial data. May also handle memory allocation.',
		tags: ['Functions','Objects']
	},
	{
		words: [
			'destructor'
		],
		desc: 'A method that destroys an object. Usually performs memory de-allocation.',
		tags: ['Functions','Objects']
	},
	{
		words: [
			'has',
			'contains'
		],
		desc: 'Returns whether or not the specified element(or index) is in a data structure.',
		tags: ['Method Names']
	},
	{
		words: [
			'add',
			'append',
			['push','pushBack',null]
		],
		desc: 'Adds an element to the end of a linear data structure.',
		tags: ['Method Names']
	},
	{
		word: 'insert',
		desc: 'Inserts an element into a data structure.',
		tags: ['Method Names']
	},
	{
		word: 'pop',
		desc: 'Removes and returns the first element in a linear data structure.\nThis operation, along with push, allows for a LIFO que.',
		tags: ['Method Names']
	},
	{
		words: [
			['rm','remove',null],
			['del','delete',null]
		],
		desc: 'Removes the element at the specified index from a linear data structure.',
		tags: ['Method Names']
	},
	{
		words: [
			'split',
			'divide'
		],
		desc: 'Splits data structure into one or more pieces.',
		tags: ['Method Names']
	},
	{
		words: [
			'slice',
			'splice'
		],
		desc: 'Extracts a section of a linear data structure.\nMay also insert a section to the structure.',
		tags: ['Method Names']
	},
	{
		words: [
			'indexOf',
			'find',
			'getPosition'
		],
		desc: 'Returns the index of a specified element in a data structure.',
		tags: ['Method Names']
	},
	{
		word: 'show',
		tags: ['Visual']
	},
	{
		word: 'hide',
		tags: ['Visual']
	},
	{
		words: [
			['a','alpha',null],
			'opacity'
		],
		desc: 'How transparent an object/image is.',
		tags: ['Visual']
	},
	{
		word: 'open',
		tags: ['Files']
	},
	{
		word: 'load',
		tags: ['Files']
	},
	{
		word: 'close',
		tags: ['Files']
	},
	{
		word: 'read',
		tags: ['Files']
	},
	{
		word: 'write',
		tags: ['Files']
	},
	{
		word: 'append',
		desc: 'Writes data to the end of the file.',
		tags: ['Files']
	},
	{
		word: 'truncate',
		desc: 'Writes data to the beginning of the file, overwriting its contents.',
		tags: ['Files']
	},
	{
		word: 'lock',
		tags: ['Files']
	},
	{
		word: 'unlock',
		tags: ['Files']
	},
	{
		word: 'touch',
		desc: 'Update the timestamp of a file to the current time.',
		tags: ['Files']
	},
	{
		word: ['eof','end-of-file',null],
		tags: ['Files']
	},
	{
		words: [
			'refresh',
			'update',
			['upgrade','Used moreso when an object itself rather than just its properties are changed']
		],
		tags: ['Etc']
	},
	{
		words: [
			['del','delete',null],
			'destroy',
			'destruct',
			'dispose',
			'erase',
			['rm','remove',null]
		],
		tags: ['Etc']
	},
	{
		words: [
			'clean',
			'clear',
			'erase',
			'free',
			'purge',
			'wipe'
		],
		tags: ['Etc']
	},
	{
		words: [
			'join',
			'merge',
			['concat','concatenate','Usually associated with strings']
		],
		tags: ['Etc']
	},
	{
		words: [
			'size',
			['len','length',null],
			['cnt','count',null]
		],
		tags: ['Etc']
	},
	{
		word: ['cap','capacity',null],
		tags: ['Etc']
	},
	{
		words: [
			['pos','position',null],
			'offset'
		],
		tags: ['Etc']
	},
	{
		word: ['rand','random',null],
		desc: 'Produces a psuedo-random number.',
		tags: ['Method Names','Math']
	},
	{
		word: 'round',
		desc: 'Round a number.',
		tags: ['Method Names','Math']
	},
	{
		word: 'floor',
		desc: 'Truncate the fractional part of a number.',
		tags: ['Method Names','Math']
	},
	{
		word: ['ceil','ceiling',null],
		desc: 'Round a real number up to an integer.',
		tags: ['Method Names','Math']
	}
];
