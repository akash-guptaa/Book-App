<!DOCTYPE html>
<html>

<head>
    <title>Review Approval</title>
</head>

@extends('mail.layouts.maillayout', ["title" => "Approval Request", "header" => ""])

@section('email_body')
    <tr>
        <td colspan="2"
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
            <p
                style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
                Dear Requestor, </p>
            <p
                style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
                The document submitted for the attached agreement has been rejected by the Insurance Coordinator.</p>
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
                                                Subject: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                Request Rejected
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Contract Name:</td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                {{$UserDetails['agreementname']}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Contract No.: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                {{$UserDetails['rqid']}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                 Counter-Party Name:
                                            </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                {{$UserDetails['cp_name']}}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Start Date:</td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{$UserDetails['send_date']}}
                                            </td>
                                        </tr>
                                        <tr>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                End Date:</td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">{{$UserDetails['end_date']}}
                                            </td>
                                        </tr>
                                        <tr>


                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: none;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Purpose : </td>
                                            <td
                                                style="border-bottom: none;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">

                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: none;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Amount : </td>
                                            <td
                                                style="border-bottom: none;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">

                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
                                                Comments, if any: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;"> {{$UserDetails['comment']}}
                                            </td>

                                        </tr>
                                        @if($UserDetails['prev_processtype_type'] == '8')
                                        <tr>
                                            <strong> 
                                                <a href="{{ $UserDetails['external_link'] }}" target="_blank" style="margin-top:15px;border-radius:5px; background:#5aa05a;border:none;  color: #fff; padding:10px; font-size: 15px; width: 150px; cursor:pointer;display: inline-block; text-align: center; text-decoration: none;" >Please click here to upload again</a>
                                            </strong>

                                        </tr>
                                        @endif
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                   
                    

                    
                </tbody>
            </table>


            <!-- <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; color: #525252; margin: 0; Margin-bottom: 0px;"> Regards,</p>
<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; color: #525252; margin: 0; Margin-bottom: 0px;"> {{$UserDetails['display_name']}}</p> -->
        </td>
    </tr>
@endsection
@section('scripts')
@endsection
