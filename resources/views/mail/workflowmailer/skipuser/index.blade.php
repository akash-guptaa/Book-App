<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>User Skipped</title>
    <link rel="stylesheet" type="text/css" href="{{url('css/app.css')}}" >
</head>

<body class=""
    style="background-color: #f9f9f9; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"
        style="border-collapse: separate; width: 100%;">
        <tbody>
            <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                    <div class="content" style="box-sizing: border-box;display: block;Margin: 0 auto;max-width: 580px;padding: 20px;padding-bottom: 0;">


                        <table role="presentation" class="main" style="border-collapse: separate;  width: 100%; background: #ffffff; border-radius: 10px;box-shadow: 0 5px 10px #0000001c;">
                            <tbody>
                                <tr>
                                    <td class="wrapper"  style="background: #ffffff;font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                                            style="border-collapse: separate;  width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align: left; position: relative;">
                                                        <!-- <h4 style=" margin: 0px; font-size: 20px; ">Approval Request
                                                        </h4> -->
                                                    </td>
                                                    <td style="text-align: right; position: relative;"><img
                                                            src="{{url('img/'.env('CLIENT_LOGO_URL').'/logo.png')}}"
                                                            alt="logo"
                                                            style="max-width: 100%; height: 32px;margin-bottom: 5px;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"
                                                        style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
                                                        <p
                                                            style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
                                                            Dear Sir/Ma'am, </p>
                                                        <p
                                                            style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
                                                            You have been skipped from workflow of following request.</p>
                                                        <p
                                                            style="font-family: sans-serif; font-size: 12px; font-weight: bold; margin: 0; Margin-bottom: 15px;">

                                                        </p>
                                                        <table role="presentation" border="0" cellpadding="0"
                                                            cellspacing="0" class="btn btn-primary"
                                                            style="border-collapse: separate;  width: 100%; box-sizing: border-box;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left"
                                                                        style="font-family: sans-serif; font-size: 14px; vertical-align: top; ">
                                                                        <div
                                                                            style="padding: 10px; border-radius: 10px; background: #f9f9f9;">
                                                                            <table role="presentation" border="0"
                                                                                cellpadding="0" cellspacing="0"
                                                                                style="border-collapse: separate;  width: 100%;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Skipped By: </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                                                            {{ $postdata->requestDetails->webregisterUserDetails->full_name ?? "" }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Requestor Name: </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                                                            {{ $postdata->requestDetails->webregisterUserDetails->display_name }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Agreement Name: </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                                                            {{ $postdata->requestDetails->getagreementDetails->agreementname }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Contract No.: </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{ $postdata->rqid }}
                                                                                            </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Name of the Counter-Party:
                                                                                        </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{  $postdata->requestDetails->counterParty->counterparty_name ?? '' }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Scope/ Purpose: </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Start Date: </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{ $postdata->requestDetails->startdate }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            End Date: </td>
                                                                                        <td
                                                                                            style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{ $postdata->requestDetails->enddate }}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>


                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="border-bottom: none;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                                                            Comments, if any: </td>
                                                                                        <td
                                                                                            style="border-bottom: none;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                                                            {{ $postdata->comment }}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            </tr>

            <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                <td class="container" style="font-family: sans-serif;font-size: 14px;vertical-align: top;display: block;Margin: 0 auto;max-width: 580px;padding: 0 10px;width: 580px;padding-bottom: 78px;">
                    <div class="content" style="box-sizing: border-box;display: block;Margin: 0 auto;max-width: 580px;padding: 0 20px;">
                        <table role="presentation" class="main" style="border-collapse: separate;width: 100%; background: #ffffff; border-radius: 10px;/* box-shadow: 0 5px 10px #0000001c; */">
                            <tbody>
                                <tr>
                                    <td class="wrapper" style="background: #ffffff; padding:20px; font-family: sans-serif;font-size: 14px;vertical-align: top;box-sizing: border-box;/* padding: 20px; */">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                                            style="border-collapse: separate;  width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td colspan="2"
                                                        style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                        <p style="font-family: sans-serif;font-size: 12px;margin: 0;Margin-bottom: 0px;font-weight: 500;color: #a5a5a5;"> Powered by:</p>
                                                        <a target="_blank" href="https://www.volody.com/">
                                                            <b><span style="font-size:10.5pt;font-family:&quot;Arial&quot;,sans-serif;color:#015eea">{{config('app.name')}}</span></b>
                                                            <!-- <img src="{{url('img/'.env('CLIENT_LOGO_URL').'/logo.png')}}" alt="logo" style="max-width: 100%;height: 24px;margin-top: 5px;"> -->
                                                        </a>
                                                        <a target="_blank" href="https://www.volody.com/"> <p style="font-family: sans-serif;font-size: 12px;margin: 0;Margin-bottom: 0px;font-weight: 500;">www.volody.com</p></a>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding:10px;"></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"
                                                        style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                        <p style="font-family: sans-serif;font-size: 12px;margin: 0;Margin-bottom: 0px;font-weight: 500;color: #a5a5a5;"> For:</p>
                                                        <a target="_blank" href="https://www.volody.com/">
                                                            <img src="{{url('img/'.env('CLIENT_LOGO_URL').'/logo.png')}}" alt="logo" style="max-width: 100%;height: 24px;margin-top: 5px;">
                                                        </a>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            </tr>
        </tbody>
    </table>


</body>
<script src="{{url('js/jquery.min.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js" integrity="sha512-rpLlll167T5LJHwp0waJCh3ZRf7pO6IT1+LZOhAyP6phAirwchClbTZV3iqL3BMrVxIYRbzGTpli4rfxsCK6Vw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="{{url('js/webiste-admin.js')}}"></script>
<script src="{{url('js/app.js')}}"></script>


</html>