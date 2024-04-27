---
title: ph-highlight
layout: default
nav_order: 50
has_children: false
parent: Helpers List
---

# ph-highlight attribute



{: .important }
> The service is allowed in your site too. because it allow CORS requst.



<div class="code-example" markdown="1">
<form ph-form="https://pagehelper.lets-script.com/highlight/"
  method="get" 
  ph-params="inline::true" 
  ph-target="#code-after-format,#formatted-show">
<span ph-error-css-for-content="is-invalid">Code to format:</span>
<textarea name="content" style="width:100%;" id="code-to-format" ph-validate="string::min:3,max:65536" rows="10"></textarea>
Formatted: 
<button type="button" ph-to-clipboard="#code-after-format" aria-label="Copy code to clipboard">
copy
</button>
<textarea ph-ignore style="width:100%;" id="code-after-format" ph-data-consumer="value" rows="6"></textarea>

<select id="lang-selector" name="lang">
<option value="html">HTML, XML</option>
<option value="javascript">JavaScript</option>
<option value="json">JSON</option>
<option value="java">Java</option>
<option value="css">CSS</option>
<option value="1c">1C</option>
<option value="4d">4D</option>
<option value="sap-abap">ABAP</option>
<option value="abnf">ABNF</option>
<option value="accesslog">Access logs</option>
<option value="ada">Ada</option>
<option value="apex">Apex</option>
<option value="arduino">Arduino (C++ w/Arduino libs)</option>
<option value="armasm">ARM assembler</option>
<option value="avrasm">AVR assembler</option>
<option value="actionscript">ActionScript</option>
<option value="alan">Alan IF</option>
<option value="ln">Alan</option>
<option value="angelscript">AngelScript</option>
<option value="apache">Apache</option>
<option value="applescript">AppleScript</option>
<option value="arcade">Arcade</option>
<option value="asciidoc">AsciiDoc</option>
<option value="aspectj">AspectJ</option>
<option value="autohotkey">AutoHotkey</option>
<option value="autoit">AutoIt</option>
<option value="awk">Awk</option>
<option value="ballerina">Ballerina</option>
<option value="bash">Bash</option>
<option value="basic">Basic</option>
<option value="bbcode">BBCode</option>
<option value="blade">Blade (Laravel)</option>
<option value="bnf">BNF</option>
<option value="bqn">BQN</option>
<option value="brainfuck">Brainfuck</option>
<option value="csharp">C#</option>
<option value="c">C</option>
<option value="cpp">C++</option>
<option value="cal">C/AL</option>
<option value="c3">C3</option>
<option value="cos">Cache Object Script</option>
<option value="candid">Candid</option>
<option value="cmake">CMake</option>
<option value="cobol">COBOL</option>
<option value="codeowners">CODEOWNERS</option>
<option value="coq">Coq</option>
<option value="csp">CSP</option>
<option value="capnproto">Cap’n Proto</option>
<option value="chaos">Chaos</option>
<option value="chapel">Chapel</option>
<option value="cisco">Cisco CLI</option>
<option value="clojure">Clojure</option>
<option value="coffeescript">CoffeeScript</option>
<option value="cpc">CpcdosC+</option>
<option value="crmsh">Crmsh</option>
<option value="crystal">Crystal</option>
<option value="curl">cURL</option>
<option value="cypher">Cypher (Neo4j)</option>
<option value="d">D</option>
<option value="dafny">Dafny</option>
<option value="dart">Dart</option>
<option value="dpr">Delphi</option>
<option value="diff">Diff</option>
<option value="django">Django</option>
<option value="dns">DNS Zone file</option>
<option value="dockerfile">Dockerfile</option>
<option value="dos">DOS</option>
<option value="dsconfig">dsconfig</option>
<option value="dts">DTS (Device Tree)</option>
<option value="dust">Dust</option>
<option value="dylan">Dylan</option>
<option value="ebnf">EBNF</option>
<option value="elixir">Elixir</option>
<option value="elm">Elm</option>
<option value="erlang">Erlang</option>
<option value="excel">Excel</option>
<option value="extempore">Extempore</option>
<option value="fsharp">F#</option>
<option value="fix">FIX</option>
<option value="flix">Flix</option>
<option value="fortran">Fortran</option>
<option value="func">FunC</option>
<option value="gcode">G-Code</option>
<option value="gams">Gams</option>
<option value="gauss">GAUSS</option>
<option value="godot">GDScript</option>
<option value="gherkin">Gherkin</option>
<option value="hbs">Glimmer and EmberJS</option>
<option value="gn">GN for Ninja</option>
<option value="go">Go</option>
<option value="gf">Grammatical Framework</option>
<option value="golo">Golo</option>
<option value="gradle">Gradle</option>
<option value="graphql">GraphQL</option>
<option value="groovy">Groovy</option>
<option value="gsql">GSQL</option>
<option value="http">HTTP</option>
<option value="haml">Haml</option>
<option value="handlebars">Handlebars</option>
<option value="haskell">Haskell</option>
<option value="haxe">Haxe</option>
<option value="hlsl">High-level shader language</option>
<option value="hy">Hy</option>
<option value="inform7">Inform7</option>
<option value="irpf90">IRPF90</option>
<option value="iptables">Iptables</option>
<option value="jolie">Jolie</option>
<option value="julia">Julia</option>
<option value="julia-repl">Julia REPL</option>
<option value="kotlin">Kotlin</option>
<option value="tex">LaTeX</option>
<option value="leaf">Leaf</option>
<option value="lean">Lean</option>
<option value="lasso">Lasso</option>
<option value="less">Less</option>
<option value="ldif">LDIF</option>
<option value="lisp">Lisp</option>
<option value="livecodeserver">LiveCode Server</option>
<option value="livescript">LiveScript</option>
<option value="lookml">LookML</option>
<option value="lua">Lua</option>
<option value="luau">Luau</option>
<option value="macaulay2">Macaulay2</option>
<option value="makefile">Makefile</option>
<option value="markdown">Markdown</option>
<option value="mathematica">Mathematica</option>
<option value="matlab">Matlab</option>
<option value="maxima">Maxima</option>
<option value="mel">Maya Embedded Language</option>
<option value="mercury">Mercury</option>
<option value="mips">MIPS Assembler</option>
<option value="mint">Mint</option>
<option value="mirc">mIRC Scripting Language</option>
<option value="mizar">Mizar</option>
<option value="mkb">MKB</option>
<option value="mlir">MLIR</option>
<option value="mojolicious">Mojolicious</option>
<option value="monkey">Monkey</option>
<option value="moonscript">Moonscript</option>
<option value="motoko">Motoko</option>
<option value="n1ql">N1QL</option>
<option value="nsis">NSIS</option>
<option value="never">Never</option>
<option value="nginx">Nginx</option>
<option value="nim">Nim</option>
<option value="nix">Nix</option>
<option value="oak">Oak</option>
<option value="ocl">Object Constraint Language</option>
<option value="ocaml">OCaml</option>
<option value="objectivec">Objective C</option>
<option value="glsl">OpenGL Shading Language</option>
<option value="openscad">OpenSCAD</option>
<option value="ruleslanguage">Oracle Rules Language</option>
<option value="oxygene">Oxygene</option>
<option value="pf">PF</option>
<option value="php">PHP</option>
<option value="papyrus">Papyrus</option>
<option value="parser3">Parser3</option>
<option value="perl">Perl</option>
<option value="phix">Phix</option>
<option value="pine">Pine Script</option>
<option value="plaintext">Plaintext</option>
<option value="pony">Pony</option>
<option value="pgsql">PostgreSQL & PL/pgSQL</option>
<option value="powershell">PowerShell</option>
<option value="processing">Processing</option>
<option value="prolog">Prolog</option>
<option value="properties">Properties</option>
<option value="proto">Protocol Buffers</option>
<option value="puppet">Puppet</option>
<option value="python">Python</option>
<option value="profile">Python profiler results</option>
<option value="python-repl">Python REPL</option>
<option value="qsharp">Q#</option>
<option value="k">Q</option>
<option value="qml">QML</option>
<option value="r">R</option>
<option value="cshtml">Razor CSHTML</option>
<option value="reasonml">ReasonML</option>
<option value="redbol">Rebol & Red</option>
<option value="rib">RenderMan RIB</option>
<option value="rsl">RenderMan RSL</option>
<option value="rescript">ReScript</option>
<option value="risc">RiScript</option>
<option value="riscv">RISC-V Assembly</option>
<option value="graph">Roboconf</option>
<option value="robot">Robot Framework</option>
<option value="rpm-specfile">RPM spec files</option>
<option value="ruby">Ruby</option>
<option value="rust">Rust</option>
<option value="rvt">RVT Script</option>
<option value="SAS">SAS</option>
<option value="scss">SCSS</option>
<option value="sql">SQL</option>
<option value="p21">STEP Part 21</option>
<option value="scala">Scala</option>
<option value="scheme">Scheme</option>
<option value="scilab">Scilab</option>
<option value="sfz">SFZ</option>
<option value="shexc">Shape Expressions</option>
<option value="shell">Shell</option>
<option value="smali">Smali</option>
<option value="smalltalk">Smalltalk</option>
<option value="sml">SML</option>
<option value="solidity">Solidity</option>
<option value="spl">Splunk SPL</option>
<option value="stan">Stan</option>
<option value="stata">Stata</option>
<option value="iecst">Structured Text</option>
<option value="stylus">Stylus</option>
<option value="subunit">SubUnit</option>
<option value="supercollider">Supercollider</option>
<option value="svelte">Svelte</option>
<option value="swift">Swift</option>
<option value="tcl">Tcl</option>
<option value="terraform">Terraform (HCL)</option>
<option value="tap">Test Anything Protocol</option>
<option value="thrift">Thrift</option>
<option value="toit">Toit</option>
<option value="tp">TP</option>
<option value="tsql">Transact-SQL</option>
<option value="twig">Twig</option>
<option value="typescript">TypeScript</option>
<option value="unicorn-rails-log">Unicorn Rails log</option>
<option value="unison">Unison</option>
<option value="vbnet">VB.Net</option>
<option value="vba">VBA</option>
<option value="vbscript">VBScript</option>
<option value="vhdl">VHDL</option>
<option value="vala">Vala</option>
<option value="verilog">Verilog</option>
<option value="vim">Vim Script</option>
<option value="wgsl">WGSL</option>
<option value="xsharp">X#</option>
<option value="axapta">X++</option>
<option value="x86asm">x86 Assembly</option>
<option value="x86asmatt">x86 Assembly (AT&T)</option>
<option value="xl">XL</option>
<option value="xquery">XQuery</option>
<option value="yml">YAML</option>
<option value="zenscript">ZenScript</option>
<option value="zephir">Zephir</option>
<option value="zig">Zig</option>
</select>

<div>Formatted Show:</div>
<div id="formatted-show" ph-data-consumer="innerhtml">
</div>

<button
type="submit"
class="btn btn-sm">
<span>format</span>
</button>

</form>
</div>
```html
<form ph-form="https://pagehelper.lets-script.com/highlight/"
  method="get" 
  ph-params="inline::true" 
  ph-target="#code-after-format,#formatted-show">
<span ph-error-css-for-content="is-invalid">Code to format:</span>
<textarea name="content" style="width:100%;" id="code-to-format" 
  ph-validate="string::min:3,max:65536" rows="10"></textarea>
Formatted: <span ph-to-clipboard="#code-after-format">copy</span>
<textarea ph-ignore style="width:100%;" id="code-after-format" ph-data-consumer="value" rows="6"></textarea>

<select id="lang-selector" name="lang">
<option value="1C">1C</option>
<option value="4D">4D</option>
<option value="ABAP">ABAP</option>
<option value="ABNF">ABNF</option>
<option value="Zig">Zig</option>
</select>

<div>Formatted Show:</div>
<div id="formatted-show" ph-data-consumer="innerhtml">
</div>

<button
type="submit"
class="btn btn-sm">
<span>format</span>
</button>
````


## struct of the `ph-highlight`

Usually, wrap the code in <pre> tags so that editor formatting actions will not affect the arrangement of the code. The server side will return the code wrapped with `<pre><code>`

<div class="code-example" markdown="1">
<div
      ph-highlight="https://pagehelper.lets-script.com/highlight/"
      style="visibility:hidden;"
      ph-params="lang::javascript,inline::true"
    >
      <pre>
import { PageHelper, FormEnricher } from "/dist/bundle.es.js";
const pageHelper = new PageHelper({ debug: true });
pageHelper.enrich();
</pre>
</div>
</div>
```html
<div
      ph-highlight="/highlight/"
      ph-params="lang::javascript,inline::true"
    >
      <pre>
import { PageHelper, FormEnricher } from "/dist/bundle.es.js";
const pageHelper = new PageHelper({ debug: true });
pageHelper.enrich();
</pre>
</div>
````
