@extends('layouts.maillayout', ["title" => "Upload Documents", "header" => ""])

@section('email_body')
    <tr>
        <td colspan="2"
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
            @if($postdata['Clientmailbody'] != null)
               {!!$postdata['Clientmailbody']!!}
            @else
                <p
                    style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
                    Dear Sir/Ma'am, </p>
                <p
                    style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
                    I request you to provide insurance policy documents for the enclosed executed agreement.</p>
                <p
                    style="font-family: sans-serif; font-size: 12px; font-weight: bold; margin: 0; Margin-bottom: 15px;">

                </p>
                
            @endif
            <strong>
                <a href="{{ $postdata['external_link'] }}" target="_blank" style="margin-top:15px;border-radius:5px; background:#5aa05a;border:none;  color: #fff; padding:10px; font-size: 15px; width: 150px; cursor:pointer;display: inline-block; text-align: center; text-decoration: none;" >Please click here to upload file</a>
            </strong>

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
