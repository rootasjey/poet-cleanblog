# poet-cleanblog

A blog starter with a bootstrap theme built with [io.js](http://iojs.org) and [express.js](http://expressjs.com)

If you want to start a blog with node.js (io.js) with few configuration,
clone this repo, install node.js, run two commands and there you go!

![Clean Blog](clean-blog.jpg)

### blog Theme
[Original blog theme: Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/)

### blog engine
[Poet](http://jsantell.github.io/poet/)

### web framework
[express.js](http://expressjs.com)

### server engine
[io.js](http://iojs.org)

### how to use
#### prerequisites
* [io.js](http://iojs.org) or [node.js](http://nodejs.org)
* A git client: [git](http://git-scm.com) or [github](https://windows.github.com)

#### run the app
* clone the repo to your desktop `git clone https://github.com/rootasjey/poet-cleanblog`
* unzip the file and go to the directory folder in a console : `cd poet-cleanblog-master`
* in the console, run `npm install`
* run the app with `iojs server.js` or `node server.js`

#### write blog posts
Posts are saved in the **_posts** folders.
They are written in [**markdown**](http://daringfireball.net/projects/markdown/syntax) format *(.md)*

To know how to use and personalize blog, you can read the full documentation on
the [official website](http://jsantell.github.io/poet/).


#### configure disqus comments
To configure comments provided by Disqus, you'll have to get a Disqus account
and to add a website in the admin section.

Follow these steps:

1. Signup on http://disqus.com/ or signin if you already have one.
2. Click on the settings gears then on _Admin_

![Blog](./public\images\screens\disqus-1.jpg)

3. On the new tab opened, create a new site configuration or open one if you arleady have.
4. At the end, you'll be able to get the disqus site shortname.
5. Go to the site's settings and scroll down to _Site Identity_
on the page. Copy the name under the _Shortname_ label.

![Blog](./public\images\screens\disqus-2.jpg)

6. Paste the _shortname_ instead of the 'insert-your-blog-disqus-shortname' in disqus.jade at line 4.
7. There you go! :D

**PS**: You can also follow instructions on this page https://[your-site].disqus.com/admin/settings/universalcode/
