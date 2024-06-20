<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" translate="no" >

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BookApp</title>
  <link rel="shortcut icon" href="{{ asset('img/clogo/favicon.ico') }}" type="image/x-icon">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="{{ asset('css/select2.min.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('css/root.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('/css/bootstrap5.2.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('/Fonts/fontawsome/free-fa-solid-900.woff2') }}" rel="stylesheet">
  <link href="{{ asset('fontawesome6/all.min.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('css/custom.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('css/common.css') }}" rel="stylesheet" type="text/css">
  <script src="{{ asset('js/jquery.js') }}"></script>
  <link rel="stylesheet" href="{{ asset('css/bootstrap-datepicker.min.css') }}" />
  <script src="{{ asset('js/jquery.alphanum.min.js') }}"></script>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.alphanum/1.0.24/jquery.alphanum.min.js"></script> -->
</head>

<body>

  <div id="main"></div>
  <script>
    const today_date = new Date().toISOString().split("T")[0];

    $(document)
      .on('keydown', 'input', function(e) {

        $(".alpha").alpha({
          // allowSpace: false, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          maxLength: 50 // eg Max Length
          // disallow: 'xyz',
        });

        $(".alphasp").alpha({
          allowSpace: true, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          maxLength: 50 // eg Max Length
          // disallow: 'xyz',
        });

        $(".alphanumeric").alphanum({
          // allowSpace: false, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          maxLength: 50 // eg Max Length
        });
        $(".alphanumericsub").alphanum({
          // allowSpace: false, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          // maxLength: 50 // eg Max Length
        });

        $(".numeric").numeric({
          disallow: 'e',
          // allowSpace: false, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          maxLength: 50 // eg Max Length
        });

        $(".address").alphanum({
          allow: '/&,;', // Specify characters to allow
          disallow: '><#@!', // Specify characters to disallow
          // allowSpace: false, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          maxLength: 50, // eg Max Length
        });

        $(".rocalpha").alphanum({
          allow: '-', // Specify characters to allow
          // allowSpace: false, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          maxLength: 50, // eg Max Length
        });

        $(".currency").numeric({
          disallow: 'e',
          allow: '.', // Specify characters to allow
          // allowSpace: false, // Allow the space character
          // allowUpper: false // Allow Upper Case characters
          maxLength: 50 // eg Max Length
        });

        // $(".email").alphanum({
        //     allowNumeric: true,
        //     allowUpper: false,
        //     allowLower: true,
        // });
      })

  

    var dd = console.log;
    var datapayload = (name,value,...props) => {
      const datapayload = {
          target: {
              name: '',
              value: ''
          }
      };
      datapayload['target']['name'] = name
      datapayload['target']['value'] = value;
      datapayload['target']['data'] = props;
      console.log('datapayload :>> ', datapayload);
      return datapayload;
    }

    const downloadfile = (name, url) => {
        // using Java Script method to get PDF file
        if (name == undefined && name != '') { console.error('file not found on /downloadMergefilepath '); return false; }
        fetch(url).then(
            (response) => {
                response.blob().then((blob) => {
                    // Creating new object of PDF file
                    const fileURL = window.URL.createObjectURL(blob);
                    // Setting various property values
                    let alink = document.createElement("a");
                    alink.href = fileURL;
                    alink.download = name;
                    alink.click();
                });
            }
        );
    };
    
    var dateformate = (value) => {
      let objectDate = new Date(value);

      let day = objectDate.getDate();
      let month = objectDate.getMonth() + 1;
      let year = objectDate.getFullYear();
      let format = day + "-" + month + "-" + year;
      return format;
    }
    /*2023-02-27*/
    var datedobformate = (value) => {
      let objectDate = new Date(value);

      let day = objectDate.getDate();
      let month = objectDate.getMonth() + 1;
      let year = objectDate.getFullYear() - 18;
      let format = year + "-" + month + "-" + day;
      return format;
    }
    const sumArray =(data)=> data.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);

    const pluck = (arr, prop) => {       
       let extractedValue = arr.map(item => item[prop]);       
       return extractedValue;    
      }
      var showToastererror = (error,toast) => {
        error && Object.keys(error).length > 0 && (
            Object.entries(error).map(([key, value]) => (
                value && value.map((data, index) => {
                    toast.error(data)
                })
            ))
        )
    }
    const dateChange = (e, name) => {
      const data = {
        target: {
          name: '',
          value: ''
        }
      };
      data['target']['name'] = name;
      data['target']['value'] = dateformate(e._d);
      return data;
    }
  </script>
  <script src="{{ asset('js/app.js') }}" defer></script>
  <script src="{{ asset('fontawesome6/all.min.js') }}"></script>
  <!-- <script src="{{ asset('fontawesome6/fontawesome1cb10895e7.js') }}"></script> -->
  <script src="{{ asset('js/Select2.min.js') }}"></script>
  <script src="{{ asset('js/custom.js') }}"></script>
  <script src="{{ asset('js/alphanum.js') }}"></script>
  <script src="{{ asset('js/popper.min.js') }}" defer></script>
  <script src="{{ asset('js/jquery.js') }}"></script>
  <script src="{{ asset('js/jquery.alphanum.min.js') }}"></script>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.alphanum/1.0.24/jquery.alphanum.min.js"></script> -->

</body>

</html>
