<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="htth3://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Phoenix Peth</title>
    <style>
    td {
        padding: 10px 0px;
    }

    @media only screen and (max-width: 620px) {
        table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
        }

        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
            font-size: 16px !important;
        }

        table[class=body] .wrapper,
        table[class=body] .article {
            padding: 10px !important;
        }

        table[class=body] .content {
            padding: 0 !important;
        }

        table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
        }

        table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
        }

        table[class=body] .btn table {
            width: 100% !important;
        }

        table[class=body] .btn a {
            width: 100% !important;
        }

        table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
        }
    }

    @media all {
        .btn-primary a:hover {
            background-color: #000 !important;
            border-color: #000 !important;
        }

        textarea::placeholder {
            color: #c0c0c0;
        }
    }
    </style>
</head>

<body class=""
    style="background-color: #d0d5e8; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"
        style="border-collapse: separate; width: 100%; background-color: #d0d5e8;">
        <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            <td class="container"
                style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                <div class="content"
                    style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 20px;">
                    <table role="presentation" class="main"
                        style="border-collapse: separate;  width: 100%; background: #ffffff; border-radius: 5px;">
                        <tr>
                            <td class="wrapper"
                                style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                                    style="border-collapse: separate;  width: 100%;">
                                    <tr>
                                        <td style="text-align: right; position: relative;"><img
                                                src="{{ asset('img/clogo/logo.svg') }}" alt="logo"
                                                style="max-width: 100%; width: 90px; position: absolute; right: 0;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                            <p
                                                style="font-family: sans-serif; font-size: 24px; font-weight: bold; margin: 0; Margin-bottom: 15px;">
                                                User Created </p>

                                            <p
                                                style="font-family: sans-serif; font-size: 14px; margin: 15px 0; Margin-bottom: 15px;line-height: 20px;">
                                                Dear Sir / Madam {{$postdata['name']}}</p>

                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                                                class="btn btn-primary"
                                                style="border-collapse: separate;  width: 100%; box-sizing: border-box;">
                                                <tbody>
                                                    <tr>
                                                        <td align="left"
                                                            style="font-family: sans-serif; font-size: 14px; vertical-align: top; ">
                                                            <table role="presentation" border="0" cellpadding="0"
                                                                cellspacing="0"
                                                                style="border-collapse: separate;  width: 100%;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td
                                                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">
                                                                            Name </td>
                                                                        <td
                                                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">
                                                                            {{$postdata['name']}}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">
                                                                            Email Name </td>
                                                                        <td
                                                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">
                                                                            {{$postdata['email']}}</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td
                                                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">
                                                                            Password </td>
                                                                        <td
                                                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">
                                                                            {{$postdata['password']}}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>



                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        </tr>
    </table>
</body>

</html>