@extends('mail.layouts.maillayout', ["title" => "Approval Request", "header" => ""])

@section('email_body')
    <tr>
        <td colspan="2"
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
            <p
                style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
                Dear Sir/Ma'am, </p>
            <p
                style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
                I request you to approve the attached document.</p>
            <p
                style="font-family: sans-serif; font-size: 12px; font-weight: bold; margin: 0; Margin-bottom: 15px;">

            </p>
            <table role="presentation" border="0" cellpadding="0"
                cellspacing="0" 
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
                                                Requestor Name: </td>
                                            <td
                                                style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
                                                {{ print_r($UserDetails->name) }}
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px 0;border-bottom: 1px solid #ddd;">
                            <table role="presentation" border="0"
                                cellpadding="0" cellspacing="0"
                                style="border-collapse:separate;width:100%;">
                                <tbody>

                                    <tr>
                                        <td
                                            style="margin-top:15px; font-family:sans-serif;font-size:14px;vertical-align:top">
                                            <p
                                                style="margin-top:20px;font-family:sans-serif;font-size:20px;font-weight:normal;color:#424242;margin:0;Margin-bottom:0px">
                                                <strong>Please click the relevant option:
                                                </strong>
                                            </p><strong>

                                            <a href="{{asset('')}}approval_check/{{base64_encode($WorkflowDetails->id)}}/{{base64_encode($SenderUser->id)}}/{{base64_encode($UserDetails->id)}}/{{base64_encode($SenderUser->id)}}/{{base64_encode(3)}}"
                                                    target="_blank"
                                                    style="margin-top:15px;border-radius:5px; background:#5aa05a;border:none;  color: #fff; padding:10px; font-size: 15px; width: 150px; cursor:pointer;display: inline-block; text-align: center; text-decoration: none;">Approval</a>
                                                <a href="{{asset('')}}approval_check/{{base64_encode($WorkflowDetails->id)}}/{{base64_encode($SenderUser->id)}}/{{base64_encode($UserDetails->id)}}/{{base64_encode($SenderUser->id)}}/{{base64_encode(4)}}"
                                                    target="_blank"
                                                    style="margin-top:15px;border-radius:5px; background:#fa5757; color: #fff; border:none; padding:10px; font-size: 15px; width: 150px; cursor:pointer;display: inline-block; text-align: center; text-decoration: none;">Reject</a>

                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                    </tr>

                    <tr>
                        <td>
                         <table role="presentation" border="0"
                                cellpadding="0" cellspacing="0"
                                style="border-collapse:separate;width:100%;" class="table uitabletype3">
                                <thead>
                                        <tr>
                                                <th style="text-align: left;">Name</th>
                                                <th>Status</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    @foreach($UserDetails['alluser'] ?? [] as $key => $val)
                                    <tr>
                                        <td>
                                            <div style="max-width: 180px;">
                                                <h6 style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 100%;font-size:13px;font-weight: 600;margin: 0;margin-bottom: 3px !important;">{{$val['name'] ?? ""}}</h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div style="padding: 2px 5px;border-radius: 3px;text-align: center;max-width: fit-content;text-transform: capitalize;font-size: 11px;line-height: 11px;font-weight: 500;height: 19px;background: #ddd!important;color: #000!important;margin: auto;" status="{{$val['status'] ?? ''}}">
                                                {{$val['status'] ?? ""}}
                                            </div>

                                        </td>
                                    </tr>
                                    @endforeach
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
<script src="{{url('js/jquery.min.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js" integrity="sha512-rpLlll167T5LJHwp0waJCh3ZRf7pO6IT1+LZOhAyP6phAirwchClbTZV3iqL3BMrVxIYRbzGTpli4rfxsCK6Vw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="{{url('js/webiste-admin.js')}}"></script>
<script src="{{url('js/app.js')}}"></script>
@endsection