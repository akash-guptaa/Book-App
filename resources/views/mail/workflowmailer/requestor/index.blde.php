<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="htth3://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Phoenix Peth</title>
    <style>
        td {    padding: 10px 0px;}
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

<body class="" style="background-color: #d0d5e8; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; width: 100%; background-color: #d0d5e8;">
        <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 20px;">
                    <table role="presentation" class="main" style="border-collapse: separate;  width: 100%; background: #ffffff; border-radius: 5px;">
                        <tr>
                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;  width: 100%;">
                                    <tr>
                                      <td style="text-align: right; position: relative;"><img src="{{ asset('img/akasaairlogo/logo.svg') }}" alt="logo" style="max-width: 100%; width: 90px; position: absolute; right: 0;"></td>
                                    </tr>
                                    <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                            <p style="font-family: sans-serif; font-size: 24px; font-weight: bold; margin: 0; Margin-bottom: 15px;">Approval Request</p>

                                            <p style="font-family: sans-serif; font-size: 14px; margin: 15px 0; Margin-bottom: 15px;line-height: 20px;">Dear Sir / Madam <br/><br/>This is with regards to the proposed contract of {{$postdata['agreementname']}}</p>

                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate;  width: 100%; box-sizing: border-box;">
                                                <tbody>
                                                    <tr>
                                                        <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; ">
                                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;  width: 100%;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">Requestor Name: </td>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">{{$postdata['display_name']}}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">Agreement Name: </td>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">{{$postdata['agreementname']}}</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">Name of the Counter-Party:</td>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">Star Enterprise Ltd</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">Scope/ Purpose: </td>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">TesT Document</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">Comments, if any: </td>
                                                                        <td style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">{{$postdata['comment']}}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate;  width: 100%; box-sizing: border-box;">
                                                <tbody>
                                                    <tr>
                                                        <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;  width: auto;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td> <a href="{{$postdata['applicationurl']}}/mail_approval/maid=416/rqid=8/vote=1/user_id=1" target="_blank" style="display: inline-block; color: #ffffff; background-color: #4dae4d; border: solid 1px #4dae4d; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px;  margin-top: 10px; margin-right: 10px; padding: 6px 20px; text-transform: capitalize; border-color: #4dae4d;">Approve</a> </td>
                                                                        <td > <a href="{{$postdata['applicationurl']}}/mail_approval/maid=416/rqid=8/vote=0/user_id=1" target="_blank" style="display: inline-block; color: #ffffff; background-color: #e3a635; border: solid 1px #e3a635; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; margin-top: 10px; padding: 6px 20px; text-transform: capitalize; border-color: #e3a635;">Reject</a> </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- <p style="font-family: sans-serif; font-size: 14px; margin: 15px 0; Margin-bottom: 15px;line-height: 20px;">Should you need any additional info Contract, I, remain at your disposal. I therefore request you to kindly accord your approval for initiating contracting process. <br/><br/>Regards,</p>
                                            <p style="font-family: sans-serif; font-size: 13px; font-weight: normal; color: #525252; margin: 0; Margin-bottom: 0px;">{{$postdata['display_name']}}</p> -->

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