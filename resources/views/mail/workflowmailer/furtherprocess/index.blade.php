@extends('layouts.maillayout', ["title" => "Further Processing", "header" => ""])

@section('email_body')
    <tr>
        <td colspan="2"
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
            <p
                style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
                Dear Sir/Ma'am,</p>
            <p
                style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
                We request you to review the attached agreement and provide your comments/inputs.</p>
            <p
                style="font-family: sans-serif; font-size: 12px; font-weight: bold; margin: 0; Margin-bottom: 15px;">

            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;  width: 100%; box-sizing: border-box; background: #ffffff;">
                <tbody>
                    <tr>
                        <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; background: #ffffff;">
                            <div style="padding: 10px; border-radius: 10px; background: #fff;">
                                <table role="presentation" border="0" cellpadding="0"
                                    cellspacing="0"
                                    style="border-collapse: separate;  width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Requestor Name: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                {{$postdata['display_name']}}</td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Agreement Name: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                {{$postdata['agreementname']}}</td>
                                        </tr>
                                        <tr>
											<td
												style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
												Contract No.: </td>
											<td
												style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{$postdata['rqid']}}
												</td>
										</tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Name of the Counter-Party: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{$postdata['cp_name']}}
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
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{$postdata['send_date']}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                End Date: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{$postdata['end_date']}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Name of the Counter-Party: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Comments, if any: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;"> {{$postdata['comment']}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; color: #525252; margin: 0; Margin-bottom: 0px;"> Regards,</p>
            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; color: #525252; margin: 0; Margin-bottom: 0px;"> {{$postdata['display_name']}}</p> -->
        </td>
    </tr>
@endsection
@section('scripts')
@endsection