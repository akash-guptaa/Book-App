@extends('layouts.maillayout', ["title" => "Phoenix Peth", "header" => ""])

@section('email_body')
    <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
            <p
                style="font-family: sans-serif; font-size: 24px; font-weight: bold; margin: 0; Margin-bottom: 15px;">
                User Created </p>

            <p
                style="font-family: sans-serif; font-size: 14px; margin: 15px 0; Margin-bottom: 15px;line-height: 20px;">
                Dear Sir / Madam {{ $postdata['full_name'] }}</p>

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
                                            {{ $postdata['full_name'] }}</td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">
                                            Email Name </td>
                                        <td
                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">
                                            {{ $postdata['email'] }}</td>
                                    </tr>

                                    <tr>
                                        <td
                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px; color: #626262; line-height: normal;padding:8px 5px; padding-right: 10px;">
                                            Password </td>
                                        <td
                                            style="border: 1px solid #999;font-family: sans-serif; font-size: 13px;padding:8px 5px; color: #000; line-height: normal;">
                                            {{ $postdata['passwd'] }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>



        </td>
    </tr>
@endsection
@section('scripts')
@endsection