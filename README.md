Worgen
===

Worgen is a tiny JS library used to parse dictionaries written in special kind of "language" and generate words or
something based on them.

The idea was making a simple and fun language to write word generators without using any JS.
 
Simplest usage
---

Imagine you want a string that is either "foo" or "bar". Worgen dictionary for that would be something like this:

    root=foo|bar
    
Adding that dictionary to Worgen and processing it would be something like this:

    var myDictionary = new Worgen('root=foo|bar');
    myDictionary.run('root');   // will return either foo or bar.
    
That's a pretty simple and useless example, of course. But here's the first rule - "foo" and "bar" are variations of
root. Calling run('root') will return one of root's variations
Okay, so here's more compicated one:

    root=The word was [rnd]
    rnd=foo|bar
    
The result of this will be either "The word was foo" or "The word was bar". So here's the second rule: "root" and "rnd"
in this example are partials and partial name surrounded by square brackets will be replaced with one of its variations.

Now, something like this:

    root=[p][s]
    p=alcon|bridge|row|snow|deep|clear|iron|summer|wild|star|grey|lokh|strong|red|fair|stone
    s=wille|ost|fog|edge|view|den|mellow|spring|fall|dale|gate|maple|bank|acre|bell|henge|hold
    
Will build us a name of a medieval city of a sort. "Rowhold", "Stonemaple", "Summerden" or hundred other variations.

Of course, this could be done using simple JS, yet, say adding third part would require additional coding, while with
worgen one could simple add another partial. And of course variations can also use partials! For example:

    root=[slog][slog]|[slog][slog][slog]
    slog=[d][a][a]|[d][a][d]|[d][a]|[a]
    a=a|o|e
    d=d|b|m|l
    
This dictuibary will generate us some sort of words like "bodooba", "bedlam", "lebebe" or "lolmalda".

Isn't that fun?

Filters
---
Now there's this idea of filters. Think of filters as of functions. We can define a filter like this:

    myDictionary.addFilter('capitalize', function(){
      return this.toUpperCase();
    });
    
..and then use it in our dictionary:

    root=[capitalize]([rnd])
    rnd=foo|bar

In this case root will return either FOO or BAR. In filter functions, "this" contains everything passed to the
filter (everything inside parentheses). partials have higher priority than filters.

Additionally the function receives everyting passed to it separated by comma, as its arguments:

    myDictionary.addFilter('repeat', function(string, number){
        return string.repeat(number);
    });
    
In this case `root=[repeat](hello, 2)` will return `hellohello`

There are some predefined filters inside **filters.js** file. Should be available via Worgen.commonFilters() function.

Using partials for functions is sometimes good idea. As variety has higher priority than filters and partials, doing
`root=[capitalize]([foo|bar])` will return either `[capitalize]([foo` or `bar])`. Therefore it'd be a good idea to add
a partial:

    root=[capitalize]([rnd])
    rnd=foo|bar
    
This should work just fine.

That is pretty much all features for now. The lib is still unfinished (and I have no idea when will it be), but already
is fun to play with. Try it for yourself!

Node, webpack
---
Oh yes, of course you can use the lib as node/webpack module! Require-ing it should work just fine.

TODO's
---
These to be added:

 - endless loop protection
 - escaping in statements
 - better regexes