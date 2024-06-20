<!DOCTYPE html>
<html>

<head>
	<title>Approval Request</title>
</head>

<body class=""
	style="background-color: #f9f9f9; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
	<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"
		style="border-collapse: separate; width: 100%;">
		<!-- <tr>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
			<td class="container"
				style="font-family: sans-serif;font-size: 14px;vertical-align: top;display: block;Margin: 0 auto;max-width: 580px;padding: 0 10px;width: 580px;">
				<div class="content"
					style="box-sizing: border-box;display: block;Margin: 0 auto;max-width: 580px;padding: 0 20px;">
					<table role="presentation" style="border-collapse:separate;width:100%;background:#ffffff;border-radius:10px;margin-top: 30px;box-shadow: 0 5px 10px #0000001c;">
						<tbody>
							<tr>
								<td style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px">
									<table role="presentation" border="0" cellpadding="0" cellspacing="0"
										style="border-collapse:separate;width:100%;">
										<tbody>

											<tr>
												<td style="margin-top:15px; font-family:sans-serif;font-size:14px;vertical-align:top">
													<p
														style="margin-top:20px;font-family:sans-serif;font-size:20px;font-weight:normal;color:#424242;margin:0;Margin-bottom:0px">
														<strong>Please review the request below
													</p>

													<a href="{{$postdata['rqid']}}/mail_approval/maid=416/rqid=8/vote=1/user_id=1" target="_blank"
													style="margin-top:15px;border-radius:5px; background:#5aa05a;border:none;  color: #fff; padding:10px; font-size: 15px; width: 150px; cursor:pointer;display: inline-block; text-align: center; text-decoration: none;">Approve</a>
													<a href="{{$postdata['rqid']}}/mail_approval/maid=416/rqid=8/vote=0/user_id=1" target="_blank"
													style="margin-top:15px;border-radius:5px; background:#fa5757; color: #fff; border:none; padding:10px; font-size: 15px; width: 150px; cursor:pointer;display: inline-block; text-align: center; text-decoration: none;">Reject</a>

												</td>
											</tr>
										</tbody>
									</table>
								</td>

							</tr>
						</tbody>
					</table>
				</div>
			</td>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
		</tr> -->
		<tr>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
			<td class="container"
				style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
				<div class="content"
					style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 20px;">


					<table role="presentation" class="main"
						style="border-collapse: separate;  width: 100%; background: #ffffff; border-radius: 10px;box-shadow: 0 5px 10px #0000001c;">
						<tr>
							<td class="wrapper"
								style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
								<table role="presentation" border="0" cellpadding="0" cellspacing="0"
									style="border-collapse: separate;  width: 100%;">
									<tr>
										<td style="text-align: left; position: relative;">
											<h4 style=" margin: 0px; font-size: 20px; ">Approval Request</h4>
										</td>
										<!-- <td style="text-align: right; position: relative;"><img src="{{url('img/'.env('CLIENT_LOGO_URL').'/logo.png')}}" -->
										<td style="text-align: right; position: relative;"><img src="{{('img/'.env('CLIENT_LOGO_URL').'/logo.svg')}}"
												alt="logo" style="max-width: 100%; height: 32px;margin-bottom: 5px;"></td>
									</tr>
									<tr>
										<td colspan="2"
											style="font-family: sans-serif; font-size: 14px; vertical-align: top;padding: 20px 0;border-top: 1px solid #ddd;">
											<p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 12px; color: #232323;">
												Dear Sir / Madam</p>
											<p style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
												This is with regards to the proposed contract of {{$postdata['agreementname']}}</p>
											<p
												style="font-family: sans-serif; font-size: 12px; font-weight: bold; margin: 0; Margin-bottom: 15px;">

											<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"
												style="border-collapse: separate;  width: 100%; box-sizing: border-box;">
												<tbody>
													<tr>
														<td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; ">
															<div style="padding: 10px; border-radius: 10px; background: #f9f9f9;">
																<table role="presentation" border="0" cellpadding="0" cellspacing="0"
																style="border-collapse: separate;  width: 100%;">
																	<tbody>
																		<tr>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
																				Requestor Name </td>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
																				{{$postdata['display_name']}}</td>
																		</tr>
																		<tr>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
																				Agreement Name </td>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
																				{{$postdata['agreementname']}}</td>
																		</tr>

																		<tr>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
																				Name of the Counter-Party </td>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
																				Star Enterprise Ltd</td>
																		</tr>
																		<tr>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
																				Scope/ Purpose </td>
																			<td
																				style="border-bottom: 1px solid #e3e3e3;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
																				TesT Document</td>
																		</tr>
																		<tr>
																			<td
																				style="border-bottom: none;font-family: sans-serif; font-size: 13px; color: #626262;font-weight: 600; line-height: normal;vertical-align: middle; padding:12px 5px; padding-right: 10px;">
																				Comments, if any </td>
																			<td
																				style="border-bottom: none;font-family: sans-serif; font-size: 13px;vertical-align: middle; padding:12px 5px; color: #000; line-height: normal;font-weight: 600;">
																				{{$postdata['comment']}}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</td>
													</tr>
												</tbody>
											</table>

											<p
												style="font-family: sans-serif; font-size: 14px; margin: 0; Margin-bottom: 20px; margin-top: 20px; color: #232323;">
												Should you need any additional info Contract, I, remain at your disposal. I therefore request you to kindly accord your approval for initiating contracting process.</p>

											<!-- <p
												style="font-family: sans-serif; font-size: 14px; font-weight: normal; color: #525252; margin: 0; Margin-bottom: 0px;">
												Regards,</p>
											<p
												style="font-family: sans-serif; font-size: 14px; font-weight: normal; color: #525252; margin: 0; Margin-bottom: 0px;">
												{{$postdata['display_name']}},</p> -->
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
			</td>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
		</tr>
		<tr>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
			<td class="container"
				style="font-family: sans-serif;font-size: 14px;vertical-align: top;display: block;Margin: 0 auto;max-width: 580px;padding: 0 10px;width: 580px;">
				<div class="content"
					style="box-sizing: border-box;display: block;Margin: 0 auto;max-width: 580px;padding: 0 20px;">
					<table role="presentation" class="main"
						style="border-collapse: separate;  width: 100%; background: #ffffff; border-radius: 10px;box-shadow: 0 5px 10px #0000001c;">
						<tbody>
							<tr>
								<td class="wrapper"
									style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
									<table role="presentation" border="0" cellpadding="0" cellspacing="0"
										style="border-collapse: separate;  width: 100%;">
										<tbody>
											<tr>
												<td colspan="2" style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
													<p
														style="font-family: sans-serif;font-size: 12px;margin: 0;Margin-bottom: 6px;font-weight: bold;color: #c0c0c0;">
														Powered by.</p>


													<p
														style="font-family: sans-serif;font-size: 14px;font-weight: bold;color: #015eea;margin: 0;Margin-bottom: 0px;">
														{{config('app.name')}}</p>
												</td>
											</tr>
											<tr>
												<td style="text-align: left; position: relative;"><img src="{{url('img/'.env('CLIENT_LOGO_URL').'/logo.png')}}" alt="logo"
														alt="logo" style="max-width: 100%; height: 20px;margin-top: 5px;"></td>
												<td style="text-align: right; position: relative;"><a target="_blank" href="www.volody.com"
														style=" text-decoration: none; ">www.volody.com</a></td>
											</tr>

										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</td>
			<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
		</tr>
	</table>
</body>

</html>