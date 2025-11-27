import html
import re
 
raw = """
O a. return (&amp;It;&amp:gt; {isLoggedIn || &amp:It;Profile /&amp:gt; } &amp:It;/&amp:gt;)
O b. return (&amp;It;&amp:gt; {isLoggedn :: &amp:It;Profile /&amp:gt; } &amp:It;/&amp:gt;)
O c. return (&amp;It;&amp:gt; {isLoggedln &amp;amp;&amp;amp; &amp:It;Profile/&amp;gt; } &amp;It;/&amp:gt;)
O d. return (&amp;It;&amp;gt; {isLoggedln == &amp:It;Profile /&amp:gt; } &amp:It;/&amp:gt;)
"""
 
# 1. Fix broken entities (replace ":" with ";" where appropriate)
fixed = re.sub(r"&([a-zA-Z]+):gt;", r"&\1;gt;", raw)
fixed = re.sub(r"&([a-zA-Z]+):It;", r"&\1;It;", fixed)
 
# 2. HTML decode the valid ones
decoded = html.unescape(fixed)
 
# 3. Replace fake entity &It; with the real '<'
decoded = decoded.replace("&It;", "<")
 
# 4. Fix fragment syntax (<...> and </...>)
decoded = decoded.replace("(<", "(<")
decoded = decoded.replace("</>", "</>")
 
# 5. Fix Profile tag formatting
decoded = decoded.replace("Profile/", "Profile /")
 
 
decoded = html.unescape(decoded)
 
print(decoded)