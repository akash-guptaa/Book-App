
<div id="preloader"><div id="status"><div class="spinner"></div></div></div>
<div class="header-bg">
<header id="topnav">
<div class="topbar-main">
    <div class="container-fluid">

        <!-- Logo container-->
        <div class="logo">
            <!-- Text Logo -->
            <a href="{{ URL::to('v1/dashboard') }}" class="logo">
                <!-- <span>Volody</span> -->
            </a>
        </div>

        <div class="menu-extras topbar-custom">
            <ul class="list-inline float-left mb-0">
                <li class="list-inline-item dropdown notification-list">
                    <div style="" class="text-center">
                    </div>
                </li>
            </ul>
        </div>

        <div class="menu-extras topbar-custom">
            <ul class="list-inline float-right mb-0">
                <li class="list-inline-item dropdown notification-list">
                </li>
                <li class="list-inline-item dropdown notification-list">
                    <a class="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button">Company switch <span class="ml-1"><i class="mdi mdi-chevron-down"></i> </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <a class="dropdown-item" href="{{url('v1/profile')}}">Volody</a>
                        <a class="dropdown-item" href="{{url('v1/profile')}}">Juris</a>
                        <a class="dropdown-item" href="{{url('v1/profile')}}">TCS</a>
                    </div>
                </li>

                <li class="list-inline-item dropdown notification-list">
                    <a class="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                        aria-haspopup="false" aria-expanded="false">
                        <img class="round" width="60" height="60" src="{{url('assets/img/avatar/avatar1.png')}}" >
                            <span class="ml-1">{{ auth()-> user() -> name}}<i class="mdi mdi-chevron-down"></i> </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <a class="dropdown-item" href="{{url('v1/profile')}}"><i class="fa fa-user"></i> Profile</a>
                        <a style="color:black; border-radius: 5px;" class="nav-link dropdown-item" data-widget="control-sidebar" data-slide="true" href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
                            &nbsp;&nbsp;&nbsp;&nbsp;<i class="dripicons-exit text-muted"></i>Logout</a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </div>
                </li>
                <li class="menu-item list-inline-item">
                    <a class="navbar-toggle nav-link">
                        <div class="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                </li>

            </ul>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<div class="navbar-custom">
    <div class="container-fluid">
        <div id="navigation">
            <!-- Navigation Menu-->
            <ul class="navigation-menu">

                <li class="has-submenu">
                    <a href="{{ URL::to('v1/dashboard') }}"><i class="dripicons-device-desktop"></i>Dashboard</a>
                </li>


                <li class="has-submenu">
                    <li class="has-submenu">
                        <li><a href="{{url('/')}}">Company Onboarding</a>
                        </li>
                        <li class="has-submenu">
                            <li><a href="{{url('/')}}">Subscription Configuration</a>
                            </li>

                            <li class="has-submenu">
                                <a href="#">Auditor Onboarding<i class="mdi mdi-chevron-down mdi-drop"></i></a>
                                <ul class="submenu">
                                    <li><a href="{{url('/')}}">Add New Member</a></li>
                                    <li><a href="{{url('/')}}">All Member List</a></li>
                                </ul>
                            </li>

                            <li class="has-submenu">
                                <a href="#"><i class="dripicons-copy"></i>Meeting<i class="mdi mdi-chevron-down mdi-drop"></i></a>
                                <ul class="submenu megamenu">
                                    <li>
                                        <ul>
                                            <li><a href="{{ url('/user') }}">User</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div> <!-- end #navigation -->
                </div> <!-- end container -->
        </div> <!-- end navbar-custom -->
    </header>