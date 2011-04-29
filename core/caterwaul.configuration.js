// Configurations.
// Caterwaul is stateful in some ways, most particularly with macro definitions and compiler options. To prevent you from having to modify the global caterwaul() function, I've enabled
// replication. This works by giving you access to copies of caterwaul() (and copies of those copies, if you so choose) that you can customize independently. So, for example:

// | var copy = caterwaul.clone().macro('foo', 'bar');
//   copy(function () {
//     var bar = 6;
//     return foo;
//   })();                 // returns 6

// Related to this is a configure() method that modifies and returns the original function:

// | caterwaul.configure(function () {
//     // Global configuration using 'this'
//   });

//   Metaprogramming.
//   Most classes don't support special accessors, but caterwaul needs them in order to be able to support cloning. For example, some attributes are referenced directly; that is, if g =
//   f.clone(), then g.x === f.x. However, often we'll want to detach the clone's attributes; this is the case whenever an attribute is mutable. To do this we'll define a new class method called
//   'attr_clone' (aliased as 'attr_cloned'), which signifies that one or more data fields are to be cloned rather than referenced.

//   Cloning.
//   Most object-oriented systems aren't really set up to clone stuff the way we're doing it here. The key is to set up a recursive class -- that is, the caterwaul function is an instance of
//   itself, so clones are just new instances of the caterwaul function. This is legal because inheritance is lazy instead of strict. Here, the 'cloneable' variable refers to the metaclass of
//   cloneable classes, which inherits from itself and therefore is an instance of itself. (It's confusing.)

    var cloneable = module().inherit_from_self().attr('attribute_roles').
                       def('clone_attribute',           function (x) {return x.clone()}).
                       def('reference_attribute',       function (x) {return x}).

                       def('initialize',                function ()  {this.attribute_roles({attribute_roles: this.clone_attribute})}).
                       def('attr_clone', 'attr_cloned', function ()  {for (var r = this.attribute_roles(), i = 0, l = arguments.length; i < l; ++i) r[arguments[i]] = this.clone_attribute;
                                                                      return this.attr.apply(this, arguments)}).

                       def('cloned_instance_data',      function ()  {var naive_clone = merge({}, this.instance_data(this)), attribute_roles = this.attribute_roles();
                                                                      for (var k in naive_clone) if (naive_clone.hasOwnProperty(k) && attribute_roles.hasOwnProperty(k))
                                                                        naive_clone[k] = attribute_roles[k].call(this, naive_clone[k]);
                                                                      return naive_clone}).

                       def('create_clone',              function ()  {var clone = this.extend(this.create()); clone[this.instance_data_key()] = this.cloned_instance_data(); return clone}).
                   rebuild()(),

//   Configurable subclass/clone.
//   This is where we add in the configuration-specific stuff. Particularly, it helps to manage a collection of possibly-applied idempotent configurations and organize them by name. It also
//   provides convenient wrapper methods to enable those configurations.

    configurable = cloneable().inherit_from_self().attr_cloned('configurations', 'active_configurations').
                         def('configuration', function (name, f) {
// Generated by SDoc 
