# Change the syntax for underscore.js templates.
# The pattern is now {{some_var}} instead of <%= some_var %>
_.templateSettings =
  interpolate : /\{\{(.+?)\}\}/g
  
@Templates = {}