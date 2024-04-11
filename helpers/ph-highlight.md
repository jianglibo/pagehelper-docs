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
<form ph-form="/highlight/"
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
<option value="1C">1C</option>
<option value="4D">4D</option>
<option value="ABAP">ABAP</option>
<option value="ABNF">ABNF</option>
<option value="Access logs">Access logs</option>
<option value="Ada">Ada</option>
<option value="Apex">Apex</option>
<option value="Arduino (C++ w/Arduino libs)">Arduino (C++ w/Arduino libs)</option>
<option value="ARM assembler">ARM assembler</option>
<option value="AVR assembler">AVR assembler</option>
<option value="ActionScript">ActionScript</option>
<option value="Alan IF">Alan IF</option>
<option value="Alan">Alan</option>
<option value="AngelScript">AngelScript</option>
<option value="Apache">Apache</option>
<option value="AppleScript">AppleScript</option>
<option value="Arcade">Arcade</option>
<option value="AsciiDoc">AsciiDoc</option>
<option value="AspectJ">AspectJ</option>
<option value="AutoHotkey">AutoHotkey</option>
<option value="AutoIt">AutoIt</option>
<option value="Awk">Awk</option>
<option value="Ballerina">Ballerina</option>
<option value="Bash">Bash</option>
<option value="Basic">Basic</option>
<option value="BBCode">BBCode</option>
<option value="Blade (Laravel)">Blade (Laravel)</option>
<option value="BNF">BNF</option>
<option value="BQN">BQN</option>
<option value="Brainfuck">Brainfuck</option>
<option value="C#">C#</option>
<option value="C">C</option>
<option value="C++">C++</option>
<option value="C/AL">C/AL</option>
<option value="C3">C3</option>
<option value="Cache Object Script">Cache Object Script</option>
<option value="Candid">Candid</option>
<option value="CMake">CMake</option>
<option value="COBOL">COBOL</option>
<option value="CODEOWNERS">CODEOWNERS</option>
<option value="Coq">Coq</option>
<option value="CSP">CSP</option>
<option value="CSS">CSS</option>
<option value="Cap’n Proto">Cap’n Proto</option>
<option value="Chaos">Chaos</option>
<option value="Chapel">Chapel</option>
<option value="Cisco CLI">Cisco CLI</option>
<option value="Clojure">Clojure</option>
<option value="CoffeeScript">CoffeeScript</option>
<option value="CpcdosC+">CpcdosC+</option>
<option value="Crmsh">Crmsh</option>
<option value="Crystal">Crystal</option>
<option value="cURL">cURL</option>
<option value="Cypher (Neo4j)">Cypher (Neo4j)</option>
<option value="D">D</option>
<option value="Dafny">Dafny</option>
<option value="Dart">Dart</option>
<option value="Delphi">Delphi</option>
<option value="Diff">Diff</option>
<option value="Django">Django</option>
<option value="DNS Zone file">DNS Zone file</option>
<option value="Dockerfile">Dockerfile</option>
<option value="DOS">DOS</option>
<option value="dsconfig">dsconfig</option>
<option value="DTS (Device Tree)">DTS (Device Tree)</option>
<option value="Dust">Dust</option>
<option value="Dylan">Dylan</option>
<option value="EBNF">EBNF</option>
<option value="Elixir">Elixir</option>
<option value="Elm">Elm</option>
<option value="Erlang">Erlang</option>
<option value="Excel">Excel</option>
<option value="Extempore">Extempore</option>
<option value="F#">F#</option>
<option value="FIX">FIX</option>
<option value="Flix">Flix</option>
<option value="Fortran">Fortran</option>
<option value="FunC">FunC</option>
<option value="G-Code">G-Code</option>
<option value="Gams">Gams</option>
<option value="GAUSS">GAUSS</option>
<option value="GDScript">GDScript</option>
<option value="Gherkin">Gherkin</option>
<option value="Glimmer and EmberJS">Glimmer and EmberJS</option>
<option value="GN for Ninja">GN for Ninja</option>
<option value="Go">Go</option>
<option value="Grammatical Framework">Grammatical Framework</option>
<option value="Golo">Golo</option>
<option value="Gradle">Gradle</option>
<option value="GraphQL">GraphQL</option>
<option value="Groovy">Groovy</option>
<option value="GSQL">GSQL</option>
<option value="HTML, XML">HTML, XML</option>
<option value="HTTP">HTTP</option>
<option value="Haml">Haml</option>
<option value="Handlebars">Handlebars</option>
<option value="Haskell">Haskell</option>
<option value="Haxe">Haxe</option>
<option value="High-level shader language">High-level shader language</option>
<option value="Hy">Hy</option>
<option value="Ini, TOML">Ini, TOML</option>
<option value="Inform7">Inform7</option>
<option value="IRPF90">IRPF90</option>
<option value="Iptables">Iptables</option>
<option value="JSON">JSON</option>
<option value="Java">Java</option>
<option value="JavaScript">JavaScript</option>
<option value="Jolie">Jolie</option>
<option value="Julia">Julia</option>
<option value="Julia REPL">Julia REPL</option>
<option value="Kotlin">Kotlin</option>
<option value="Lang">Lang</option>
<option value="LaTeX">LaTeX</option>
<option value="Leaf">Leaf</option>
<option value="Lean">Lean</option>
<option value="Lasso">Lasso</option>
<option value="Less">Less</option>
<option value="LDIF">LDIF</option>
<option value="Lisp">Lisp</option>
<option value="LiveCode Server">LiveCode Server</option>
<option value="LiveScript">LiveScript</option>
<option value="LookML">LookML</option>
<option value="Lua">Lua</option>
<option value="Luau">Luau</option>
<option value="Macaulay2">Macaulay2</option>
<option value="Makefile">Makefile</option>
<option value="Markdown">Markdown</option>
<option value="Mathematica">Mathematica</option>
<option value="Matlab">Matlab</option>
<option value="Maxima">Maxima</option>
<option value="Maya Embedded Language">Maya Embedded Language</option>
<option value="Mercury">Mercury</option>
<option value="MIPS Assembler">MIPS Assembler</option>
<option value="Mint">Mint</option>
<option value="mIRC Scripting Language">mIRC Scripting Language</option>
<option value="Mizar">Mizar</option>
<option value="MKB">MKB</option>
<option value="MLIR">MLIR</option>
<option value="Mojolicious">Mojolicious</option>
<option value="Monkey">Monkey</option>
<option value="Moonscript">Moonscript</option>
<option value="Motoko">Motoko</option>
<option value="N1QL">N1QL</option>
<option value="NSIS">NSIS</option>
<option value="Never">Never</option>
<option value="Nginx">Nginx</option>
<option value="Nim">Nim</option>
<option value="Nix">Nix</option>
<option value="Oak">Oak</option>
<option value="Object Constraint Language">Object Constraint Language</option>
<option value="OCaml">OCaml</option>
<option value="Objective C">Objective C</option>
<option value="OpenGL Shading Language">OpenGL Shading Language</option>
<option value="OpenSCAD">OpenSCAD</option>
<option value="Oracle Rules Language">Oracle Rules Language</option>
<option value="Oxygene">Oxygene</option>
<option value="PF">PF</option>
<option value="PHP">PHP</option>
<option value="Papyrus">Papyrus</option>
<option value="Parser3">Parser3</option>
<option value="Perl">Perl</option>
<option value="Pine Script">Pine Script</option>
<option value="Plaintext">Plaintext</option>
<option value="Pony">Pony</option>
<option value="PostgreSQL & PL/pgSQL">PostgreSQL & PL/pgSQL</option>
<option value="PowerShell">PowerShell</option>
<option value="Processing">Processing</option>
<option value="Prolog">Prolog</option>
<option value="Properties">Properties</option>
<option value="Protocol Buffers">Protocol Buffers</option>
<option value="Puppet">Puppet</option>
<option value="Python">Python</option>
<option value="Python profiler results">Python profiler results</option>
<option value="Python REPL">Python REPL</option>
<option value="Q#">Q#</option>
<option value="Q">Q</option>
<option value="QML">QML</option>
<option value="R">R</option>
<option value="Razor CSHTML">Razor CSHTML</option>
<option value="ReasonML">ReasonML</option>
<option value="Rebol & Red">Rebol & Red</option>
<option value="RenderMan RIB">RenderMan RIB</option>
<option value="RenderMan RSL">RenderMan RSL</option>
<option value="ReScript">ReScript</option>
<option value="RiScript">RiScript</option>
<option value="RISC-V Assembly">RISC-V Assembly</option>
<option value="Roboconf">Roboconf</option>
<option value="Robot Framework">Robot Framework</option>
<option value="RPM spec files">RPM spec files</option>
<option value="Ruby">Ruby</option>
<option value="Rust">Rust</option>
<option value="RVT Script">RVT Script</option>
<option value="SAS">SAS</option>
<option value="SCSS">SCSS</option>
<option value="SQL">SQL</option>
<option value="STEP Part 21">STEP Part 21</option>
<option value="Scala">Scala</option>
<option value="Scheme">Scheme</option>
<option value="Scilab">Scilab</option>
<option value="SFZ">SFZ</option>
<option value="Shape Expressions">Shape Expressions</option>
<option value="Shell">Shell</option>
<option value="Smali">Smali</option>
<option value="Smalltalk">Smalltalk</option>
<option value="SML">SML</option>
<option value="Solidity">Solidity</option>
<option value="Splunk SPL">Splunk SPL</option>
<option value="Stan">Stan</option>
<option value="Stata">Stata</option>
<option value="Structured Text">Structured Text</option>
<option value="Stylus">Stylus</option>
<option value="SubUnit">SubUnit</option>
<option value="Supercollider">Supercollider</option>
<option value="Svelte">Svelte</option>
<option value="Swift">Swift</option>
<option value="Tcl">Tcl</option>
<option value="Terraform (HCL)">Terraform (HCL)</option>
<option value="Test Anything Protocol">Test Anything Protocol</option>
<option value="Thrift">Thrift</option>
<option value="Toit">Toit</option>
<option value="TP">TP</option>
<option value="Transact-SQL">Transact-SQL</option>
<option value="Twig">Twig</option>
<option value="TypeScript">TypeScript</option>
<option value="Unicorn Rails log">Unicorn Rails log</option>
<option value="Unison">Unison</option>
<option value="VB.Net">VB.Net</option>
<option value="VBA">VBA</option>
<option value="VBScript">VBScript</option>
<option value="VHDL">VHDL</option>
<option value="Vala">Vala</option>
<option value="Verilog">Verilog</option>
<option value="Vim Script">Vim Script</option>
<option value="WGSL">WGSL</option>
<option value="X#">X#</option>
<option value="X++">X++</option>
<option value="x86 Assembly">x86 Assembly</option>
<option value="x86 Assembly (AT&T)">x86 Assembly (AT&T)</option>
<option value="XL">XL</option>
<option value="XQuery">XQuery</option>
<option value="YAML">YAML</option>
<option value="ZenScript">ZenScript</option>
<option value="Zephir">Zephir</option>
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
