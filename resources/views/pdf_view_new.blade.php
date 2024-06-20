<html>

<head>
  <style>
    /**
                Set the margins of the pdf page to 0, so the footer and the header
                can be of the full height and width !
             **/
    @page {
      margin: 0cm 0cm;
    }

    /** Define now the real margins of every pdf page in the PDF **/
    body {
      margin-top: 3cm;
      margin-left: 2cm;
      margin-right: 2cm;
      margin-bottom: 2cm;
    }

    /** Define the header rules **/
    header {
      position: fixed;
      top: 0cm;
      left: 0cm;
      right: 0cm;
      height: 1cm;
    }

    /** Define the footer rules **/
    footer {
      position: fixed;
      bottom: 0cm;
      left: 0cm;
      right: 0cm;
      height: 1cm;
    }
   .page-break {
    page-break-after: avoid;
  }
</style>
  </style>
</head>

<body>
  <!-- Define header and footer blocks before your subject matter content -->
  <header>
      
  </header>
  <!-- Wrap the subject matter content of your PDF inside a main tag -->
  <main>
      <div>
      {!! $body_content !!}
      <div class="page-break"></div>
    </div>
  </main>
  <footer>
    
  </footer>


</body>

</html>
