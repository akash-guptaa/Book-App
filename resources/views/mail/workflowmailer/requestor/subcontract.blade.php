@extends('layouts.maillayout', ["title" => "Approval Request", "header" => "Subcontract Request"])

@section('email_body')
    <tr>
        <td colspan="2"
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
            <p
                style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
                Dear Sir/Ma'am, </p>
            <p
                style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
                This is with regards to the original contract with contract no.
                {{ $postdata['parent_id']}}.</p>
            <p
                style="font-family: sans-serif; font-size: 12px; font-weight: bold; margin: 0; Margin-bottom: 15px;">

            <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                class="btn btn-primary"
                style="border-collapse: separate;  width: 100%; box-sizing: border-box;">
                <tbody>
                    <tr>
                        <td align="left"
                            style="font-family: sans-serif; font-size: 14px; vertical-align: top; ">
                            <div
                                style="padding: 10px; border-radius: 10px; background: #f9f9f9;">
                                <table role="presentation" border="0" cellpadding="0"
                                    cellspacing="0"
                                    style="border-collapse: separate;  width: 100%;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Subcontract with request no.
                                                {{ $postdata['rqid']}} has been created
                                                for your review. Please login into your
                                                account and check.
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