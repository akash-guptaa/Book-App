@extends('layouts.maillayout', ['title' => 'Approval Request', 'header' => ''])

@section('email_body')

    <tr>
        <td colspan="2"
            style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
            <p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
                Dear {{$postdata['name']}}, </p>
            <p style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
                The Agreements uploaded via bulk Contract Creation have been uploaded successfully.</p>
        </td>
    </tr>


@endsection
@section('scripts')
@endsection