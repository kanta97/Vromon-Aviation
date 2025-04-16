module.exports = ( name, package_name, package_location,package_summary, Invoice_no, mobile_no, price,travel_date,no_of_travelers,payment_mode,due  ) => {
    const today = new Date();
return `
    <!doctype html>
    <html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
xmlns="http://www.w3.org/TR/REC-html40">

<head>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<meta name=ProgId content=Word.Document>
<meta name=Generator content="Microsoft Word 15">
<meta name=Originator content="Microsoft Word 15">
<link rel=File-List href="Receipt%20Format_files/filelist.xml">
<link rel=Edit-Time-Data href="Receipt%20Format_files/editdata.mso">

<link rel=themeData href="Receipt%20Format_files/themedata.thmx">
<link rel=colorSchemeMapping
href="Receipt%20Format_files/colorschememapping.xml">

<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536859905 -1073732485 9 0 511 0;}
@font-face
	{font-family:"Segoe UI";
	panose-1:2 11 5 2 4 2 4 2 2 3;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-469750017 -1073683329 9 0 511 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	line-height:107%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
a:link, span.MsoHyperlink
	{mso-style-priority:99;
	color:#0563C1;
	mso-themecolor:hyperlink;
	text-decoration:underline;
	text-underline:single;}
a:visited, span.MsoHyperlinkFollowed
	{mso-style-noshow:yes;
	mso-style-priority:99;
	color:#954F72;
	mso-themecolor:followedhyperlink;
	text-decoration:underline;
	text-underline:single;}
p.MsoAcetate, li.MsoAcetate, div.MsoAcetate
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-link:"Balloon Text Char";
	margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:9.0pt;
	font-family:"Segoe UI",sans-serif;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;}
span.BalloonTextChar
	{mso-style-name:"Balloon Text Char";
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Balloon Text";
	mso-ansi-font-size:9.0pt;
	mso-bidi-font-size:9.0pt;
	font-family:"Segoe UI",sans-serif;
	mso-ascii-font-family:"Segoe UI";
	mso-hansi-font-family:"Segoe UI";
	mso-bidi-font-family:"Segoe UI";}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
.MsoPapDefault
	{mso-style-type:export-only;
	margin-bottom:8.0pt;
	line-height:107%;}
@page WordSection1
	{size:8.5in 11.0in;
	margin:1.0in 1.0in 1.0in 1.0in;
	mso-header-margin:.5in;
	mso-footer-margin:.5in;
	mso-paper-source:0;}
div.WordSection1
	{page:WordSection1;}
-->
</style>

</head>

<body lang=EN-US link="#0563C1" vlink="#954F72" style='tab-interval:.5in'>

<div class=WordSection1>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
  <td width=276 style='width:207.0pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'><span style='font-size:18.0pt;
  font-family:"Arial",sans-serif;mso-fareast-font-family:"Times New Roman";
  mso-no-proof:yes'><img width=196 height=54
  src="data:image/png;base64,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" alt=navigator-logo v:shapes="Picture_x0020_1"><![endif]></span></b></p>
  </td>
  <td width=347 valign=top style='width:260.5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=right style='margin-bottom:0in;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><span style='font-size:10.0pt;
  mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin;color:#7F7F7F;
  mso-themecolor:text1;mso-themetint:128'>Flat - 6B, House # 88, Road # 17/A,
  Block - E, Banani, Dhaka., 1213 Dhaka, Bangladesh<o:p></o:p></span></p>
  <p class=MsoNormal align=right style='margin-bottom:0in;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><span style='font-size:10.0pt;
  mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin;color:#7F7F7F;
  mso-themecolor:text1;mso-themetint:128'>Phone: <span style='background:white'>+8802-8836881,
  +8801943335555, +8801955587999<o:p></o:p></span></span></p>
  <p class=MsoNormal align=right style='margin-bottom:0in;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><span style='font-size:10.0pt;
  mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin;color:#7F7F7F;
  mso-themecolor:text1;mso-themetint:128;background:white'>E-mail:
  info@navigatortourism.com, navigatortourisminfo@gmail.com<o:p></o:p></span></p>
  <p class=MsoNormal align=right style='margin-bottom:0in;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><span style='font-size:10.0pt;
  mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin;color:#7F7F7F;
  mso-themecolor:text1;mso-themetint:128'>Website: www.navigatortourism.com</span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<div align=center>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=162 valign=top style='width:121.25pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Invoice No.:</span></p>
  </td>
  <td width=234 valign=top style='width:175.5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${Invoice_no}</span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=162 valign=top style='width:121.25pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Invoice Date:</span></p>
  </td>
  <td width=234 valign=top style='width:175.5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${today}</span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=162 valign=top style='width:121.25pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Prepared from:</span></p>
  </td>
  <td width=234 valign=top style='width:175.5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><a
  href="http://www.navigatortourism.com">www.navigatortourism.com</a></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=162 valign=top style='width:121.25pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Prepared for:</span></p>
  </td>
  <td width=234 valign=top style='width:175.5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${name}</span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes'>
  <td width=162 valign=top style='width:121.25pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Recipient Contact:</span></p>
  </td>
  <td width=234 valign=top style='width:175.5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${mobile_no}</span></p>
  </td>
 </tr>
</table>

</div>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;
 mso-yfti-tbllook:1184;mso-padding-alt:0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#00B0F0;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'>Item<o:p></o:p></b></p>
  </td>
  <td width=44 valign=top style='width:32.7pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#00B0F0;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'>Quantity<o:p></o:p></b></p>
  </td>
  <td width=42 valign=top style='width:31.8pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#00B0F0;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'>Rate<o:p></o:p></b></p>
  </td>
  <td width=124 valign=top style='width:92.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#00B0F0;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'>Amount<o:p></o:p></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Package Name: ${package_name}</span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Package Location: ${package_location}</span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Package Summary: ${package_summary}</span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Total No. of Travelers: ${no_of_travelers}</span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Travel Date: ${travel_date}</span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Payment Mode: ${payment_mode}</span></p>
  </td>
  <td width=44 valign=top style='width:32.7pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=42 valign=top style='width:31.8pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=124 valign=top style='width:92.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${price}<o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Sub-Total</span></p>
  </td>
  <td width=210 colspan=3 valign=top style='width:157.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${price}<o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>Taxes</span></p>
  </td>
  <td width=210 colspan=3 valign=top style='width:157.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'><span style='color:windowtext'>Total
  Amount<o:p></o:p></span></b></p>
  </td>
  <td width=210 colspan=3 valign=top style='width:157.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${price}<o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'><span style='color:windowtext'>Paid<o:p></o:p></span></b></p>
  </td>
  <td width=210 colspan=3 valign=top style='width:157.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${price}<o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'><span style='color:windowtext'>Due<o:p></o:p></span></b></p>
  </td>
  <td width=210 colspan=3 valign=top style='width:157.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${due}<o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:7;mso-yfti-lastrow:yes'>
  <td width=414 valign=top style='width:310.25pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'><span style='color:windowtext'>Final
  Balance<o:p></o:p></span></b></p>
  </td>
  <td width=210 colspan=3 valign=top style='width:157.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'>${due}<o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;
 mso-yfti-tbllook:1184;mso-padding-alt:0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=623 valign=top style='width:467.5pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#00B0F0;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'>Special Notes:<o:p></o:p></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes'>
  <td width=623 valign=top style='width:467.5pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='color:windowtext'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<p class=MsoNormal align=center style='text-align:center'><i style='mso-bidi-font-style:
normal'>Thank you for being our guest.<o:p></o:p></i></p>

</div>

</body>

</html>

    `;
};
