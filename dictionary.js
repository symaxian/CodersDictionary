var dict = [
	{
		words:[
			['arg','argument',null],
			['param','parameter',null]
		],
		desc:'An item passed into a function/method.',
		tag:'Functions'
	},
	{
		word:'class',
		desc:'A template for an object.',
		tag:'Objects'
	},
	{
		words:[
			'interface',
			'protocol',
			'specification'
		],
		desc:'A set of parameters that an object/class may comply with. If so then that object/class is said to implement that interface/protocol/specification.',
		tag:'Objects'
	},
	{
		words:[
			'member',
			['attr','attribute','Usually refers to metadata'],
			['field','Usually refers to a variable'],
			['prop','property','Usually refers to a variable']
		],
		desc:'A piece of data/code associated with a specific object.',
		tag:'Objects'
	},
	{
		word:['ptr','pointer',null],
		desc:'Points to a location in memory.',
		tag:'Memory'
	},
	{
		word:['ref','reference',null],
		desc:'Refers to another item.',
		tag:'Reference'
	},
	{
		words:[
			'list',
			'array',
			'stack'
		],
		desc:'Common names for linear data structures.',
		tag:'Data Structure'
	},
	{
		word:['col','column',null],
		desc:'Refers to the column of a table.',
		tag:'Data Structure'
	},
	{
		word:'row',
		desc:'Refers to the row of a table.',
		tag:'Data Structure'
	},
	{
		words:[
			'this',
			'self'
		],
		desc:'A reference to the current scope.',
		tag:'Reference'
	},
	{
		words:[
			['pos','position',null],
			['origin','Usually from where the object "begins", such as the top-left corner on modern display coordinate systems']
		],
		tag:'Visual'
	},
	{
		words:[
			'x',
			['h','horz','horizontal',null]
		],
		desc:'An objects horizontal position on a 2d plane.',
		tag:'Visual'
	},
	{
		words:[
			'y',
			['v','vert','vertical',null]
		],
		desc:'An objects vertical position on a 2d plane.',
		tag:'Visual'
	},
	{
		words:[
			'xScale',
			['hScale','horizontalScale',null]
		],
		desc:'An objects horizontal scale.',
		tag:'Visual'
	},
	{
		words:[
			'yScale',
			['vScale','verticalScale',null]
		],
		desc:'An objects vertical scale.',
		tag:'Visual'
	},
	{
		words:[
			'angle',
			['r','rotation',null]
		],
		desc:'An objects rotation.',
		tag:'Visual'
	},
	{
		word:['id','identifier',null],
		desc:'A unique identifier for an object.',
		tag:'Reference'
	},
	{
		words:[
			'slot',
			'element'
		],
		desc:'A set place for data in a structure.',
		tag:'Data Structure'
	},
	{
		words:[
			['proc','process',null],
			'task',
			'routine',
			'operation'
		],
		desc:'Some piece of executable code, something that runs.',
		tag:'Etc'
	},
	{
		words:[
			'draw',
			'paint',
			'render',
			'output'
		],
		desc:'Draw some image/shape onto a destination.',
		tag:'Visual'
	},
	{
		words:[
			['cpy','copy',null],
			'clone',
			'duplicate'
		],
		tag:'Method Names'
	},
	{
		word:['var','variable',null],
		tag:'Reference',
		desc:'A piece of data.'
	},
	{
		words:[
			['i','index','Usually a number'],
			['itr','iterator','Usually an object']
		],
		desc:'An item that iterates(moves incrementally) over a linear data structure.',
		tag:'Data Structure'
	},
	{
		word:'child',
		desc:'Describes an item that is a descendant or sub-item of its parent.',
		tags:['Data Structure','Trees']
	},
	{
		word:'parent',
		desc:'Describes an item that has a child.',
		tags:['Data Structure','Trees']
	},
	{
		words:[
			'node',
			'element'
		],
		desc:'A discrete piece of a structure.',
		tags:['Data Structure','Trees']
	},
	{
		word:'leaf node',
		desc:'A node on a tree that has no children.',
		tag:'Trees'
	},
	{
		words:[
			'root',
			'root node',
			'origin'
		],
		desc:'The root node of a tree, from which all other nodes descend.',
		tag:'Trees'
	},
	{
		word:'breadth-first',
		desc:'A method of traversing a tree that involves moving across to neighboring nodes before descending to child nodes.',
		tag:'Trees'
	},
	{
		word:'depth-first',
		desc:'A method of traversing a tree that involves descending as far as possible from the root node before backtracking and descending along the next path.',
		tag:'Trees'
	},
	{
		word:'collapse',
		tag:'Trees'
	},
	{
		word:['addr','address',null],
		desc:'A location in memory.',
		tag:'Memory'
	},
	{
		word:['mem','memory',null],
		desc:'A set range of slots that hold data.',
		tag:'Memory'
	},
	{
		word:['buf','buffer',null],
		desc:'A piece of memory, usually allocated to hold a specific piece/size of data.',
		tags:['Memory','Data Structure']
	},
	{
		word:['str','string',null],
		desc:'A set length of bytes/characters.',
		tag:'Data Structure'
	},
	{
		words:[
			'print',
			'output',
			'display',
			'write'
		],
		desc:'Output a piece of text to the display.',
		tag:'Method Names'
	},
	{
		word:'method',
		desc:'A function that belongs to and acts primarily on an object or certain type of object.',
		tag:'Objects'
	},
	{
		word:'getter',
		desc:'A method that returns a property of an object.',
		tags:['Functions','Objects']
	},
	{
		word:'setter',
		desc:'A method that sets a property of an object.',
		tags:['Functions','Objects']
	},
	{
		word:'accessor',
		desc:'A method that only accesses and does not modify an object.',
		tags:['Functions','Objects']
	},
	{
		word:'mutator',
		desc:'A method that modifies an object.',
		tags:['Functions','Objects']
	},
	{
		words:[
			'constructor',
			'initiator'
		],
		desc:'A method called during/after the creation of a new object.',
		tags:['Functions','Objects']
	},
	{
		word:['init','initiate',null],
		desc:'A method that initiates an object, usually called after its construction.',
		tags:['Method Names','Objects']
	},
	{
		words:[
			'has',
			'contains'
		],
		desc:'Returns whether or not the specified element(or index) is in a data structure.',
		tag:'Method Names'
	},
	{
		words:[
			'add',
			'append',
			['push','pushBack',null]
		],
		desc:'Adds an element to the end of a linear data structure.',
		tag:'Method Names'
	},
	{
		word:'insert',
		desc:'Inserts an element to a certain position in a data structure.',
		tag:'Method Names'
	},
	{
		word:'pop',
		desc:'Removes and returns the first element in a linear data structure.',
		tag:'Method Names'
	},
	{
		words:[
			['rm','remove',null],
			['del','delete',null]
		],
		desc:'Removes the element at the specified index from a linear data structure.',
		tag:'Method Names'
	},
	{
		words:[
			'split',
			'divide'
		],
		desc:'Splits a linear data structure into one or more pieces.',
		tag:'Method Names'
	},
	{
		words:[
			'slice',
			'splice'
		],
		desc:'Returns a piece of a linear data structure.',
		tag:'Method Names'
	},
	{
		words:[
			'indexOf',
			'find',
			'getPosition'
		],
		desc:'Returns the index of a specified element in a data structure.',
		tag:'Method Names'
	},
	{
		word:'show',
		tag:'Visual'
	},
	{
		word:'hide',
		tag:'Visual'
	},
	{
		words:[
			['a','alpha',null],
			'opacity'
		],
		desc:'How transparent an object is.',
		tag:'Visual'
	},
	{
		word:'open',
		tag:'Files'
	},
	{
		word:'load',
		tag:'Files'
	},
	{
		word:'close',
		tag:'Files'
	},
	{
		word:'read',
		tag:'Files'
	},
	{
		word:'write',
		tag:'Files'
	},
	{
		word:'append',
		desc:'Writes data to the end of the file.',
		tag:'Files'
	},
	{
		word:'truncate',
		desc:'Writes data to the beginning of the file, overwriting its contents.',
		tag:'Files'
	},
	{
		word:'lock',
		tag:'Files'
	},
	{
		word:'unlock',
		tag:'Files'
	},
	{
		word:'touch',
		desc:'Updates the timestamp to the current time.',
		tag:'Files'
	},
	{
		word:['eof','end-of-file',null],
		tag:'Files'
	},
	{
		words:[
			'refresh',
			'update',
			['upgrade','Used moreso when an object itself rather than just its properties are changed']
		],
		tag:'Etc'
	},
	{
		words:[
			['del','delete',null],
			'destroy',
			'destruct',
			'dispose',
			'erase',
			['rm','remove',null]
		],
		tag:'Etc'
	},
	{
		words:[
			'clean',
			'clear',
			'erase',
			'free',
			'purge',
			'wipe'
		],
		tag:'Etc'
	},
	{
		words:[
			'join',
			'merge',
			['concat','concatenate','Usually associated with strings']
		],
		tag:'Etc'
	},
	{
		words:[
			'size',
			['len','length',null],
			['cnt','count',null]
		],
		tag:'Etc'
	},
	{
		word:['cap','capacity',null],
		tag:'Etc'
	},
	{
		words:[
			['pos','position',null],
			'offset'
		],
		tag:'Etc'
	},
	{
		word:['rand','random',null],
		desc:'Produces a random number.',
		tags:['Method Names','Math']
	},
	{
		word:'round',
		desc:'Rounds a number to a certain amount.',
		tags:['Method Names','Math']
	},
	{
		word:'floor',
		desc:'Truncates the fractional part of a number.',
		tags:['Method Names','Math']
	},
	{
		word:['ceil','ceiling',null],
		desc:'Rounds a real number up to an integer.',
		tags:['Method Names','Math']
	}
];
