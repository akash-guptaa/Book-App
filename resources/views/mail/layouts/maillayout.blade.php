<!DOCTYPE html>
<html>
<head>
    <title>{{$title}}</title>
</head>
<body style="background-color: #edf2f7;color:#000; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0"  style="border-collapse: separate; width: 100%;">
	<tr>
		<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
		<td style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
			<div  style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 20px;">
				<table role="presentation"  style="border-collpse: separate;  width: 100%; background: #ffffff; border-radius: 10px;box-shadow: 0 5px 10px #0000001c;">
					<tr>
						<td  style="background: #ffffff;font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
							<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;  width: 100%;">

									@if(env('MAILHEADERLOGODIRECTION') == 'left')
                                        <tr>
                                            <td style="text-align: left; position: relative;"><img src="{{url('img/'.env('CLIENT_LOGO_URL').'/logo.png')}}" alt="logo" style="max-width: 100%; height: 32px;margin-bottom:25px;"></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: left; position: relative;"><h4 style=" margin: 0px; font-size: 20px; margin-bottom: 10px;">{{$header}}</h4></td>
                                        </tr>
                                    @endif

                                    @if(env('MAILHEADERLOGODIRECTION') == 'right')
                                        <tr>
                                            <td style="text-align: left; position: relative;"><h4 style=" margin: 0px; font-size: 20px; ">{{$header}}</h4></td>
                                            <td style="text-align: right; position: relative;"><img src="{{url('img/'.env('CLIENT_LOGO_URL').'/logo.png')}}" alt="logo" style="max-width: 100%; height: 32px;margin-bottom: 5px;"></td>
                                        </tr>
                                    @endif

                                    @yield('email_body')


                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        </tr>

        @include("mail.mailcommonlayouts.footer")

@yield("scripts")
