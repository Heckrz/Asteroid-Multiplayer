var create = function(type, size)
 {
 var obj = Object.create(def);
 obj.init(type, size);
 
 return obj;
 };
 
 var def =
 {
 _type: null,
 _size: null,
 
 init: function(type, size)
 {
 this._type = type;
 this._size = size;
 
 var i = 0;
 var length = this._size;
 
 
 }, 
