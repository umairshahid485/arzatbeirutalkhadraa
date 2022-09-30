 <!-- BEGIN SIDEBAR -->
            <div class="page-sidebar-wrapper">
                <!-- BEGIN SIDEBAR -->
                <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                <div class="page-sidebar navbar-collapse collapse">

                    <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">

                        <li class="sidebar-toggler-wrapper hide">
                            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                            <div class="sidebar-toggler"> </div>
                            <!-- END SIDEBAR TOGGLER BUTTON -->
                        </li>

                        <li class="sidebar-search-wrapper">

                        </li>
                       <li class="nav-item {{ (\Request::route()->getName() == 'dashboard') ? 'active' : '' }}">
                            <a href="{{ route('dashboard') }}" class="nav-link nav-toggle">
                                <i class="icon-home"></i>
                                <span class="title">Dashboard</span>
                            </a>
                        </li>

                        <li class="nav-item {{ (\Request::route()->getName() == 'users') ? 'active' : '' }}">
                            <a href="{{ route('users') }}" class="nav-link ">
                                <i class="fa fa-users"></i>
                                <span class="title">Users</span>
                            </a>
                        </li>

                        <li class="nav-item {{ (\Request::route()->getName() == 'admins') ? 'active' : '' }}">
                            <a href="{{ route('admins') }}" class="nav-link ">
                                <i class="fa fa-user"></i>
                                <span class="title">Admins</span>
                            </a>
                        </li>
                        <li class="nav-item {{ (\Request::route()->getName() == 'categories.index') ? 'active' : '' }}">
                            <a href="{{ route('categories.index') }}" class="nav-link ">
                                <i class="fa fa-pencil-square-o"></i>
                                <span class="title">Categories</span>
                            </a>
                        </li>
                        <li class="nav-item {{ (\Request::route()->getName() == 'products.index') ? 'active' : '' }}">
                            <a href="{{ route('products.index') }}" class="nav-link ">
                                <i class="fa fa-globe"></i>
                                <span class="title">Products</span>
                            </a>
                        </li>

                        <li class="nav-item {{ (\Request::route()->getName() == 'order.index') ? 'active' : '' }}">
                            <a href="{{ route('order.index') }}" class="nav-link ">
                                <i class="fa fa-globe"></i>
                                <span class="title">Orders</span>
                            </a>
                        </li>

                    </ul>
                    <!-- END SIDEBAR MENU -->
                    <!-- END SIDEBAR MENU -->
                </div>
                <!-- END SIDEBAR -->
            </div>
            <!-- END SIDEBAR -->
             <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                <div class="page-content">
