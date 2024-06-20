
<!-- @include('includes/header_start') -->

<!-- @include('includes/header_end') -->

<!-- css -->
<div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="page-title-box">
                    <h4 class="page-title busines_data"> <i class="fa fa-user-plus"></i>User Log Activity</h4>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card m-b-20">
            		<table class="table table-bordered">
						<tr>
							<th>No</th>
							<th>Subject</th>
							<th>URL</th>
							<th>Method</th>
							<th>Ip</th>
							<th width="300px">User Agent</th>
							<th>User Id</th>
							<th>Action</th>
						</tr>
						@if($logs->count())
							@foreach($logs as $key => $log)
							<tr>
								<td>{{ ++$key }}</td>
								<td>{{ $log->subject }}</td>
								<td class="text-success">{{ $log->url }}</td>
								<td><label class="label label-info">{{ $log->method }}</label></td>
								<td class="text-warning">{{ $log->ip }}</td>
								<td class="text-danger">{{ $log->agent }}</td>
								<td>{{ $log->user_id }}</td>
								<td><button class="btn btn-danger btn-sm">Delete</button></td>
							</tr>
							@endforeach
						@endif
					</table>
                </div>
            </div> <!-- end col -->
        </div> <!-- end row -->
    </div> <!-- end container -->
</div>
<!-- end wrapper -->

<!-- @include('includes/footer_account') -->