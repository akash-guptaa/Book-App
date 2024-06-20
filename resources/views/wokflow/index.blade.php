<x-mail::message>
# Introduction

The body of your message.

<x-mail::button :url="''">
Approve
</x-mail::button>
<x-mail::button :url="'/api/v1/workflowAproval/{workflow_id}/{user_id}/{status}'">
Reject

</x-mail::button>


Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
