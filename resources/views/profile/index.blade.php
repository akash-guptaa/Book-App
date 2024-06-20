@include('includes/header_start')

@include('assets/css/profile/index')

@include('includes/header_end')
<!-- css -->
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12">
            <div class="page-title-box">
                <h4 class="page-title busines_data"> <i class="fa fa-user-plus"></i>ADD USER</h4>
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
                    <div class="card-body">
                        <div class="container-fluid" style="padding:3%;">
                            <form id="userinsert">
                                @csrf
                                <div class="row col-sm-12">
                                    <div class="col">
                                        <label id="name_label">Name</label>
                                        <input type="text" class="form-control" id="name" placeholder="Enter name"
                                            name="name">
                                    </div>
                                    <div class="col">
                                        <label>Email</label>
                                        <input type="text" class="form-control" placeholder="Enter email" name="email">
                                    </div>
                                    <div class="col">
                                        <label>Password</label>
                                        <input type="password" class="form-control" placeholder="Enter password"
                                            name="pswd">
                                    </div>
                                    <div class="col">
                                        <button type="submit" class="btn btn-primary saveuser">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> <!-- end col -->
        </div> <!-- end row -->
    </div> <!-- end container -->
</div>
<!-- end wrapper -->

@include('assets/js/profile/index')
@include('includes/footer_account')