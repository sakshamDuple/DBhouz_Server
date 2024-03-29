function formatted_date(date)
{
   var result="";
   var d = new Date(date)
   result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()
   return result;
}

const EmailHTML = (subject:string, message:any) => {
	console.log("subject",subject)
	//user email verified
	switch (subject) {
		case "Verify Email User":
			return `
        <div>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
	<style type="text/css">
		p {
			margin: 8px 0;
			padding: 0;
		}

		table {
			border-collapse: collapse;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			display: block;
			margin: 0;
			padding: 0;
		}

		img,
		a img {
			border: 0;
			height: auto;
			outline: none;
			text-decoration: none;
		}

		body,
		#bodyTable,
		#bodyCell {
			height: 100%;
			margin: 0;
			padding: 0;
			width: 100%;
			font-family: 'Roboto', Arial, sans-serif;
		}

		.mcnPreviewText {
			display: none !important;
		}

		#outlook a {
			padding: 0;
		}

		img {
			-ms-interpolation-mode: bicubic;
		}

		table {
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}

		.ReadMsgBody {
			width: 100%;
		}

		.ExternalClass {
			width: 100%;
		}

		p,
		a,
		li,
		td,
		blockquote {
			mso-line-height-rule: exactly;
		}

		a[href^=tel],
		a[href^=sms] {
			color: inherit;
			cursor: default;
			text-decoration: none;
		}

		p,
		a,
		li,
		td,
		body,
		table,
		blockquote {
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		}

		.ExternalClass,
		.ExternalClass p,
		.ExternalClass td,
		.ExternalClass div,
		.ExternalClass span,
		.ExternalClass font {
			line-height: 100%;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}

		.templateContainer {
			max-width: 600px !important;
		}

		a.mcnButton {
			display: block;
		}

		.mcnImage,
		.mcnRetinaImage {
			vertical-align: bottom;
		}

		.mcnTextContent {
			word-break: break-word;
		}

		.mcnTextContent img {
			height: auto !important;
		}

		.mcnDividerBlock {
			table-layout: fixed !important;
		}

		/*
 @tab Page
 @section Heading 1
 @style heading 1
 */
		h1 {
			/*@editable*/
			color: #222222;
			/*@editable*/
			font-family: 'Roboto', Arial, sans-serif;
			/*@editable*/
			font-size: 40px;
			/*@editable*/
			font-style: normal;
			/*@editable*/
			font-weight: bold;
			/*@editable*/
			line-height: 150%;
			/*@editable*/
			letter-spacing: normal;
			/*@editable*/
			text-align: center;
		}

		/*
 @tab Page
 @section Heading 2
 @style heading 2
 */
		h2 {
			/*@editable*/
			color: #f2672a;
			/*@editable*/
			font-family: 'Roboto', Arial, sans-serif;
			/*@editable*/
			font-size: 34px;
			/*@editable*/
			font-style: normal;
			/*@editable*/
			font-weight: bold;
			/*@editable*/
			line-height: 150%;
			/*@editable*/
			letter-spacing: normal;
			/*@editable*/
			text-align: center;
		}

		/*
 @tab Page
 @section Heading 3
 @style heading 3
 */
		h3 {
			/*@editable*/
			color: #232f3e;
			/*@editable*/
			font-family: 'Roboto', Arial, sans-serif;
			/*@editable*/
			font-size: 22px;
			/*@editable*/
			font-style: normal;
			/*@editable*/
			font-weight: bold;
			/*@editable*/
			line-height: 150%;
			/*@editable*/
			letter-spacing: normal;
			/*@editable*/
			text-align: left;
		}

		/*
 @tab Page
 @section Heading 4
 @style heading 4
 */
		h4 {
			/*@editable*/
			color: #232f3e;
			/*@editable*/
			font-family: Georgia;
			/*@editable*/
			font-size: 20px;
			/*@editable*/
			font-style: italic;
			/*@editable*/
			font-weight: normal;
			/*@editable*/
			line-height: 125%;
			/*@editable*/
			letter-spacing: normal;
			/*@editable*/
			text-align: center;
		}

		/*
 @tab Header
 @section Header Container Style
 */
		#templateHeader {
			/*@editable*/
			background-color: #ffffff;
			/*@editable*/
			background-image: none;
			/*@editable*/
			background-repeat: no-repeat;
			/*@editable*/
			background-position: center;
			/*@editable*/
			background-size: cover;
			/*@editable*/
			border-top: 0;
			/*@editable*/
			border-bottom: 0;
			/*@editable*/
			padding-top: 24px;
			/*@editable*/
			padding-bottom: 0px;
		}

		/*
 @tab Header
 @section Header Interior Style
 */
		.headerContainer {
			/*@editable*/
			background-color: #transparent;
			/*@editable*/
			background-image: none;
			/*@editable*/
			background-repeat: no-repeat;
			/*@editable*/
			background-position: center;
			/*@editable*/
			background-size: cover;
			/*@editable*/
			border-top: 0;
			/*@editable*/
			border-bottom: 0;
			/*@editable*/
			padding-top: 0;
			/*@editable*/
			padding-bottom: 0;
		}

		/*
 @tab Header
 @section Header Text
 */
		.headerContainer .mcnTextContent,
		.headerContainer .mcnTextContent p {
			/*@editable*/
			color: #757575;
			/*@editable*/
			font-family: 'Roboto', Arial, sans-serif;
			/*@editable*/
			font-size: 16px;
			/*@editable*/
			line-height: 150%;
			/*@editable*/
			text-align: left;
			/*@editable*/
			font-weight: 400;
			;

		}

		/*
 @tab Header
 @section Header Link
 */
		.headerContainer .mcnTextContent a,
		.headerContainer .mcnTextContent p a {
			/*@editable*/
			color: #007C89;
			/*@editable*/
			font-weight: normal;
			/*@editable*/
			text-decoration: underline;
		}

		/*
 @tab Body
 @section Body Container Style
 */
		#templateBody {
			/*@editable*/
			background-color: #ffffff;
			/*@editable*/
			background-image: none;
			/*@editable*/
			background-repeat: no-repeat;
			/*@editable*/
			background-position: center;
			/*@editable*/
			background-size: cover;
			/*@editable*/
			border-top: 0;
			/*@editable*/
			border-bottom: 0;
			/*@editable*/
			padding-top: 0;
			/*@editable*/
			padding-bottom: 0;
		}

		/*
 @tab Body
 @section Body Interior Style
 */
		.bodyContainer {
			/*@editable*/
			background-color: #transparent;
			/*@editable*/
			background-image: none;
			/*@editable*/
			background-repeat: no-repeat;
			/*@editable*/
			background-position: center;
			/*@editable*/
			background-size: cover;
			/*@editable*/
			border-top: 0;
			/*@editable*/
			border-bottom: 1px none;
			/*@editable*/
			padding-top: 0;
			/*@editable*/
			padding-bottom: 0;
		}

		/*
 @tab Body
 @section Body Text
 */
		.bodyContainer .mcnTextContent,
		.bodyContainer .mcnTextContent p {
			/*@editable*/
			color: #757575;
			/*@editable*/
			font-family: 'Roboto', Arial, sans-serif;
			/*@editable*/
			font-size: 16px;
			/*@editable*/
			line-height: 150%;
			/*@editable*/
			text-align: left;
		}

		/*
 @tab Body
 @section Body Link
 */
		.bodyContainer .mcnTextContent a,
		.bodyContainer .mcnTextContent p a {
			/*@editable*/
			color: #2f53d7;
			/*@editable*/
			font-weight: normal;
			/*@editable*/
			text-decoration: underline;
		}

		/*
 @tab Footer
 @section Footer Style
 */
		#templateFooter {
			/*@editable*/
			background-color: #ffffff;
			/*@editable*/
			background-image: none;
			/*@editable*/
			background-repeat: no-repeat;
			/*@editable*/
			background-position: center;
			/*@editable*/
			background-size: cover;
			/*@editable*/
			border-top: 0;
			/*@editable*/
			border-bottom: 1px none;
			/*@editable*/
			padding-top: 16px;
			/*@editable*/
			padding-bottom: 24px;
		}

		/*
 @tab Footer
 @section Footer Interior Style
 */
		.footerContainer {
			/*@editable*/
			background-color: #transparent;
			/*@editable*/
			background-image: none;
			/*@editable*/
			background-repeat: no-repeat;
			/*@editable*/
			background-position: center;
			/*@editable*/
			background-size: cover;
			/*@editable*/
			border-top: 1px none;
			/*@editable*/
			border-bottom: 0;
			/*@editable*/
			padding-top: 0;
			/*@editable*/
			padding-bottom: 0;
		}

		/*
 @tab Footer
 @section Footer Text
 */
		p {
			/*@editable*/
			color: #adadae;
			/*@editable*/
			font-family: 'Roboto', Arial, sans-serif;
			/*@editable*/
			font-size: 12px;
			/*@editable*/
			font-weight: 400;
			/*@editable*/
			line-height: 125%;
			/*@editable*/
			text-align: left;
			/*@editable*/
			letter-spacing: 0.24px;
		}

		/*
 @tab Footer
 @section Footer Link
 */
		@media only screen and (max-width: 480px) {

			/*
 @tab Mobile Styles
 @section Heading 1
 @tip Make the first-level headings larger in size for better readability on small screens.
 */
			h1 {
				/*@editable*/
				font-size: 30px !important;
				/*@editable*/
				line-height: 125% !important;
			}
		}

		@media only screen and (max-width: 480px) {

			/*
 @tab Mobile Styles
 @section Heading 2
 @tip Make the second-level headings larger in size for better readability on small screens.
 */
			h2 {
				/*@editable*/
				font-size: 26px !important;
				/*@editable*/
				line-height: 125% !important;
				/*@editable*/
				color: #f2672a !important;

			}
		}

		@media only screen and (max-width: 480px) {

			/*
 @tab Mobile Styles
 @section Heading 3
 @tip Make the third-level headings larger in size for better readability on small screens.
 */
			h3 {
				/*@editable*/
				font-size: 20px !important;
				/*@editable*/
				line-height: 150% !important;
			}
		}

		@media only screen and (max-width: 480px) {

			/*
 @tab Mobile Styles
 @section Heading 4
 @tip Make the fourth-level headings larger in size for better readability on small screens.
 */
			h4 {
				/*@editable*/
				font-size: 18px !important;
				/*@editable*/
				line-height: 150% !important;
			}
		}
	</style>
	<center>
		<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
			<tbody>
				<tr>
					<td align="center" id="bodyCell" valign="top">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tbody>
								<tr>
									<td align="center" data-template-container="" id="templateHeader"
										style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;"
										valign="top">
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="templateContainer"
											style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;"
											width="100%">
											<tbody>
												<tr>
													<td class="headerContainer" valign="top">
														<table align="center" border="0" cellpadding="0" cellspacing="0"
															class="templateContainer"
															style="background: #fff; margin-bottom: 10px;" width="100%">
															<tbody>
																<tr>
																	<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0"
																			cellspacing="0" class="mcnTextBlock"
																			style="min-width:100%; margin-top: 50px;"
																			width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner"
																						style="padding-top: 20px;"
																						valign="top">
																						<table align="left" border="0"
																							cellpadding="0"
																							cellspacing="0"
																							class="mcnTextContentContainer"
																							style="max-width:100%; min-width:100%;"
																							width="100%">
																							<tbody>
																								<tr>
																									<td class="mcnTextContent"
																										style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;"
																										valign="top">
																										<div><img
																												src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" 
																												style="max-width: 100%; width: 210px; height: 40px" />
																										</div>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
														<!-- ===== middle content Start===== -->
														<table align="center" border="0" cellpadding="0" cellspacing="0"
															class="templateContainer"
															style="background: #fff; margin-bottom: 50px;" width="100%">
															<tbody>
																<tr>
																	<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0"
																			cellspacing="0" class="mcnTextBlock"
																			style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner"
																						style="padding-top: 20px;"
																						valign="top">
																						<table align="left" border="0"
																							cellpadding="0"
																							cellspacing="0"
																							class="mcnTextContentContainer"
																							style="max-width:100%; min-width:100%; margin-bottom: 30px;"
																							width="100%">
																							<tbody>
																								<tr>
																									<td class="mcnTextContent"
																										style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;"
																										valign="top">
																										<h2
																											style="font-size: 24px; color: #f2672a;">
																											Hey Shopper,
																										</h2>
																										<h4
																											style="font-size: 26px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;">
																											Welcome to
																											DB
																											Houz </h4>
																										<p
																											style="text-align: center;">
																											You are
																											almost
																											ready to
																											purchase the
																											best
																											products!
																											Please click
																											on
																											the button
																											below
																											to verify
																											your
																											email
																											address.
																										</p>
																										<a href='${message}'><button
																											style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; " onclick="window.location.href='${message}';">
                                                                                                            Verify Email
																										</button></a>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																						<table align="left" border="0"
																							cellpadding="0"
																							cellspacing="0"
																							class="mcnTextContentContainer"
																							style="max-width:100%; min-width:100%; margin-bottom: 20px;"
																							width="100%">
																							<tbody>
																								<tr>
																									<td class="mcnTextContent"
																										style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;"
																										valign="top">
																										<table
																											align="left"
																											border="0"
																											cellpadding="0"
																											cellspacing="0"
																											class="mcnTextContentContainer"
																											style="max-width:100%; min-width:100%;"
																											width="100%">
																											<tbody>
																												<tr>
																													<td class="mcnTextContent"
																														style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;"
																														valign="top">
																														<p
																															style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;">
																															<b>Thank
																																You
																																|
																																Support
																																Team
																																|
																																DB
																																Houz
																															</b>
																														</p>
																													</td>
																												</tr>
																											</tbody>
																										</table>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																						<table align="left" border="0"
																							cellpadding="0"
																							cellspacing="0"
																							class="mcnTextContentContainer"
																							style="max-width:100%; min-width:100%;"
																							width="100%">
																							<tbody>
																								<tr>
																									<td class="mcnTextContent"
																										style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; "
																										valign="top">
																										<div><img
																												style="max-width: 100%; height: 240px;"
																												src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" />
																										</div>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
										<!-- ===== middle content End===== -->
									</td>
								</tr>
								<tr>

								</tr>

								<!-- ===== footer -->

							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</center>
</div>
        `
		case "Verify Email Merchant":
			return `<div>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
<style type="text/css">p{
 margin:8px 0;
 padding:0;
 }
 table{
 border-collapse:collapse;
 }
 h1,h2,h3,h4,h5,h6{
 display:block;
 margin:0;
 padding:0;
 }
 img,a img{
 border:0;
 height:auto;
 outline:none;
 text-decoration:none;
 }
 body,#bodyTable,#bodyCell{
 height:100%;
 margin:0;
 padding:0;
 width:100%;
 font-family: 'Roboto', Arial,sans-serif;
 }
 .mcnPreviewText{
 display:none !important;
 }
 #outlook a{
 padding:0;
 }
 img{
 -ms-interpolation-mode:bicubic;
 }
 table{
 mso-table-lspace:0pt;
 mso-table-rspace:0pt;
 }
 .ReadMsgBody{
 width:100%;
 }
 .ExternalClass{
 width:100%;
 }
 p,a,li,td,blockquote{
 mso-line-height-rule:exactly;
 }
 a[href^=tel],a[href^=sms]{
 color:inherit;
 cursor:default;
 text-decoration:none;
 }
 p,a,li,td,body,table,blockquote{
 -ms-text-size-adjust:100%;
 -webkit-text-size-adjust:100%;
 }
 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
 line-height:100%;
 }
 a[x-apple-data-detectors]{
 color:inherit !important;
 text-decoration:none !important;
 font-size:inherit !important;
 font-family:inherit !important;
 font-weight:inherit !important;
 line-height:inherit !important;
 }
 .templateContainer{
 max-width:600px !important;
 }
 a.mcnButton{
 display:block;
 }
 .mcnImage,.mcnRetinaImage{
 vertical-align:bottom;
 }
 .mcnTextContent{
 word-break:break-word;
 }
 .mcnTextContent img{
 height:auto !important;
 }
 .mcnDividerBlock{
 table-layout:fixed !important;
 }
 /*
 @tab Page
 @section Heading 1
 @style heading 1
 */
 h1{
 /*@editable*/color:#222222;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:40px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Page
 @section Heading 2
 @style heading 2
 */
 h2{
 /*@editable*/color:#f2672a;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:34px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Page
 @section Heading 3
 @style heading 3
 */
 h3{
 /*@editable*/color:#232f3e;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:22px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:left;
 }
 /*
 @tab Page
 @section Heading 4
 @style heading 4
 */
 h4{
 /*@editable*/color:#232f3e;
 /*@editable*/font-family:Georgia;
 /*@editable*/font-size:20px;
 /*@editable*/font-style:italic;
 /*@editable*/font-weight:normal;
 /*@editable*/line-height:125%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Header
 @section Header Container Style
 */
 #templateHeader{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:24px;
 /*@editable*/padding-bottom:0px;
 }
 /*
 @tab Header
 @section Header Interior Style
 */
 .headerContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Header
 @section Header Text
 */
 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
 /*@editable*/color:#757575;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:16px;
 /*@editable*/line-height:150%;
 /*@editable*/text-align:left;
 /*@editable*/font-weight: 400;;
 
 }
 /*
 @tab Header
 @section Header Link
 */
 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
 /*@editable*/color:#007C89;
 /*@editable*/font-weight:normal;
 /*@editable*/text-decoration:underline;
 }
 /*
 @tab Body
 @section Body Container Style
 */
 #templateBody{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Body
 @section Body Interior Style
 */
 .bodyContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:1px none ;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Body
 @section Body Text
 */
 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
 /*@editable*/color:#757575;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:16px;
 /*@editable*/line-height:150%;
 /*@editable*/text-align:left;
 }
 /*
 @tab Body
 @section Body Link
 */
 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
 /*@editable*/color:#2f53d7;
 /*@editable*/font-weight:normal;
 /*@editable*/text-decoration:underline;
 }
 /*
 @tab Footer
 @section Footer Style
 */
 #templateFooter{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:1px none ;
 /*@editable*/padding-top:16px;
 /*@editable*/padding-bottom:24px;
 }
 /*
 @tab Footer
 @section Footer Interior Style
 */
 .footerContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:1px none ;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Footer
 @section Footer Text
 */
 p{
 /*@editable*/color:#adadae;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:12px;
 /*@editable*/font-weight:400;
 /*@editable*/line-height:125%;
 /*@editable*/text-align:left;
 /*@editable*/letter-spacing:0.24px;
 }
 /*
 @tab Footer
 @section Footer Link
 */
 	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 1
 @tip Make the first-level headings larger in size for better readability on small screens.
 */
 h1{
 /*@editable*/font-size:30px !important;
 /*@editable*/line-height:125% !important;
 }
 }	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 2
 @tip Make the second-level headings larger in size for better readability on small screens.
 */
 h2{
 /*@editable*/font-size:26px !important;
 /*@editable*/line-height:125% !important;
 /*@editable*/color:#f2672a !important;
 
 }
 }	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 3
 @tip Make the third-level headings larger in size for better readability on small screens.
 */
 h3{
 /*@editable*/font-size:20px !important;
 /*@editable*/line-height:150% !important;
 }
 }	@media only screen and (max-width: 480px) {
 /*
 @tab Mobile Styles
 @section Heading 4
 @tip Make the fourth-level headings larger in size for better readability on small screens.
 */
 h4{
 /*@editable*/font-size:18px !important;
 /*@editable*/line-height:150% !important;
 }
 }	
</style>
<center>
<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
	<tbody>
		<tr>
			<td align="center" id="bodyCell" valign="top">
				<table border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody>
						<tr>
							<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
								<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
									<tbody>
										<tr>
											<td class="headerContainer" valign="top">
												<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
													<tbody>
														<tr>
															<td class="headerContainer" valign="top">
															<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																<tbody class="mcnTextBlockOuter">
																	<tr>
																		<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															</td>
														</tr>
													</tbody>
												</table>
												<!-- ===== middle content Start===== -->
												<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
													<tbody>
														<tr>
															<td class="headerContainer" valign="top">
															<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																<tbody class="mcnTextBlockOuter">
																	<tr>
																		<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																						<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant</h2>
																						<h4 style="font-size: 26px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;">Welcome to DB Houz </h4>
																						<p style="text-align: center;">You are almost ready to get started! Please click on the below button to verify your email address.</p>
																						<a href='${message}'><button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px;" onclick="window.location.href='${message}';">Verify Email</button></a>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																						<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																							<tbody>
																								<tr>
																									<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																										<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																						<!-- <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																							<tbody>
																								<tr>
																									<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																					
																									</td>
																									<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																										<p style="height: 1px; background-color: #eee;"></p>
																									</td>
																									<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top"></td>
																								</tr>
																							</tbody>
																						</table> -->
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																						<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<!-- ===== middle content End===== -->
							</td>
						</tr>
						<tr>
							
						</tr>

						<!-- ===== footer -->
						
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
</center>
        </div>`
		case "merchant email verified":
			return `<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
<style type="text/css">p{
 margin:8px 0;
 padding:0;
 }
 table{
 border-collapse:collapse;
 }
 h1,h2,h3,h4,h5,h6{
 display:block;
 margin:0;
 padding:0;
 }
 img,a img{
 border:0;
 height:auto;
 outline:none;
 text-decoration:none;
 }
 body,#bodyTable,#bodyCell{
 height:100%;
 margin:0;
 padding:0;
 width:100%;
 font-family: 'Roboto', Arial,sans-serif;
 }
 .mcnPreviewText{
 display:none !important;
 }
 #outlook a{
 padding:0;
 }
 img{
 -ms-interpolation-mode:bicubic;
 }
 table{
 mso-table-lspace:0pt;
 mso-table-rspace:0pt;
 }
 .ReadMsgBody{
 width:100%;
 }
 .ExternalClass{
 width:100%;
 }
 p,a,li,td,blockquote{
 mso-line-height-rule:exactly;
 }
 a[href^=tel],a[href^=sms]{
 color:inherit;
 cursor:default;
 text-decoration:none;
 }
 p,a,li,td,body,table,blockquote{
 -ms-text-size-adjust:100%;
 -webkit-text-size-adjust:100%;
 }
 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
 line-height:100%;
 }
 a[x-apple-data-detectors]{
 color:inherit !important;
 text-decoration:none !important;
 font-size:inherit !important;
 font-family:inherit !important;
 font-weight:inherit !important;
 line-height:inherit !important;
 }
 .templateContainer{
 max-width:600px !important;
 }
 a.mcnButton{
 display:block;
 }
 .mcnImage,.mcnRetinaImage{
 vertical-align:bottom;
 }
 .mcnTextContent{
 word-break:break-word;
 }
 .mcnTextContent img{
 height:auto !important;
 }
 .mcnDividerBlock{
 table-layout:fixed !important;
 }
 /*
 @tab Page
 @section Heading 1
 @style heading 1
 */
 h1{
 /*@editable*/color:#222222;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:40px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Page
 @section Heading 2
 @style heading 2
 */
 h2{
 /*@editable*/color:#f2672a;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:34px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Page
 @section Heading 3
 @style heading 3
 */
 h3{
 /*@editable*/color:#232f3e;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:22px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:left;
 }
 /*
 @tab Page
 @section Heading 4
 @style heading 4
 */
 h4{
 /*@editable*/color:#232f3e;
 /*@editable*/font-family:Georgia;
 /*@editable*/font-size:20px;
 /*@editable*/font-style:italic;
 /*@editable*/font-weight:normal;
 /*@editable*/line-height:125%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Header
 @section Header Container Style
 */
 #templateHeader{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:24px;
 /*@editable*/padding-bottom:0px;
 }
 /*
 @tab Header
 @section Header Interior Style
 */
 .headerContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Header
 @section Header Text
 */
 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
 /*@editable*/color:#757575;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:16px;
 /*@editable*/line-height:150%;
 /*@editable*/text-align:left;
 /*@editable*/font-weight: 400;;
 
 }
 /*
 @tab Header
 @section Header Link
 */
 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
 /*@editable*/color:#007C89;
 /*@editable*/font-weight:normal;
 /*@editable*/text-decoration:underline;
 }
 /*
 @tab Body
 @section Body Container Style
 */
 #templateBody{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Body
 @section Body Interior Style
 */
 .bodyContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:1px none ;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Body
 @section Body Text
 */
 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
 /*@editable*/color:#757575;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:16px;
 /*@editable*/line-height:150%;
 /*@editable*/text-align:left;
 }
 /*
 @tab Body
 @section Body Link
 */
 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
 /*@editable*/color:#2f53d7;
 /*@editable*/font-weight:normal;
 /*@editable*/text-decoration:underline;
 }
 /*
 @tab Footer
 @section Footer Style
 */
 #templateFooter{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:1px none ;
 /*@editable*/padding-top:16px;
 /*@editable*/padding-bottom:24px;
 }
 /*
 @tab Footer
 @section Footer Interior Style
 */
 .footerContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:1px none ;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Footer
 @section Footer Text
 */
 p{
 /*@editable*/color:#adadae;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:12px;
 /*@editable*/font-weight:400;
 /*@editable*/line-height:125%;
 /*@editable*/text-align:left;
 /*@editable*/letter-spacing:0.24px;
 }
 /*
 @tab Footer
 @section Footer Link
 */
 	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 1
 @tip Make the first-level headings larger in size for better readability on small screens.
 */
 h1{
 /*@editable*/font-size:30px !important;
 /*@editable*/line-height:125% !important;
 }
 }	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 2
 @tip Make the second-level headings larger in size for better readability on small screens.
 */
 h2{
 /*@editable*/font-size:26px !important;
 /*@editable*/line-height:125% !important;
 /*@editable*/color:#f2672a !important;
 
 }
 }	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 3
 @tip Make the third-level headings larger in size for better readability on small screens.
 */
 h3{
 /*@editable*/font-size:20px !important;
 /*@editable*/line-height:150% !important;
 }
 }	@media only screen and (max-width: 480px) {
 /*
 @tab Mobile Styles
 @section Heading 4
 @tip Make the fourth-level headings larger in size for better readability on small screens.
 */
 h4{
 /*@editable*/font-size:18px !important;
 /*@editable*/line-height:150% !important;
 }
 }	
</style>
<center>
<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
	<tbody>
		<tr>
			<td align="center" id="bodyCell" valign="top">
				<table border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody>
						<tr>
							<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
								<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
									<tbody>
										<tr>
											<td class="headerContainer" valign="top">
												<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
													<tbody>
														<tr>
															<td class="headerContainer" valign="top">
															<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																<tbody class="mcnTextBlockOuter">
																	<tr>
																		<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															</td>
														</tr>
													</tbody>
												</table>
												<!-- ===== middle content Start===== -->
												<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
													<tbody>
														<tr>
															<td class="headerContainer" valign="top">
															<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																<tbody class="mcnTextBlockOuter">
																	<tr>
																		<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																						<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message}</h2>
																						<h4 style="font-size: 20px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;"> Congratulations! Your email has been successfully verified </h4>
																						<p style="text-align: center; font-size: 16px;">
																							kindly login to DB Houz with your registered email ID and get started soonest possible. 
																						</p>
																						<!-- <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">Verify Email </button> -->
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																						<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																							<tbody>
																								<tr>
																									<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																										<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																						<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<!-- ===== middle content End===== -->
							</td>
						</tr>
						<tr>
							
						</tr>

						<!-- ===== footer -->
						
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
</center>
			</div>`
		case "user email verified":
			return `<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
<style type="text/css">p{
 margin:8px 0;
 padding:0;
 }
 table{
 border-collapse:collapse;
 }
 h1,h2,h3,h4,h5,h6{
 display:block;
 margin:0;
 padding:0;
 }
 img,a img{
 border:0;
 height:auto;
 outline:none;
 text-decoration:none;
 }
 body,#bodyTable,#bodyCell{
 height:100%;
 margin:0;
 padding:0;
 width:100%;
 font-family: 'Roboto', Arial,sans-serif;
 }
 .mcnPreviewText{
 display:none !important;
 }
 #outlook a{
 padding:0;
 }
 img{
 -ms-interpolation-mode:bicubic;
 }
 table{
 mso-table-lspace:0pt;
 mso-table-rspace:0pt;
 }
 .ReadMsgBody{
 width:100%;
 }
 .ExternalClass{
 width:100%;
 }
 p,a,li,td,blockquote{
 mso-line-height-rule:exactly;
 }
 a[href^=tel],a[href^=sms]{
 color:inherit;
 cursor:default;
 text-decoration:none;
 }
 p,a,li,td,body,table,blockquote{
 -ms-text-size-adjust:100%;
 -webkit-text-size-adjust:100%;
 }
 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
 line-height:100%;
 }
 a[x-apple-data-detectors]{
 color:inherit !important;
 text-decoration:none !important;
 font-size:inherit !important;
 font-family:inherit !important;
 font-weight:inherit !important;
 line-height:inherit !important;
 }
 .templateContainer{
 max-width:600px !important;
 }
 a.mcnButton{
 display:block;
 }
 .mcnImage,.mcnRetinaImage{
 vertical-align:bottom;
 }
 .mcnTextContent{
 word-break:break-word;
 }
 .mcnTextContent img{
 height:auto !important;
 }
 .mcnDividerBlock{
 table-layout:fixed !important;
 }
 /*
 @tab Page
 @section Heading 1
 @style heading 1
 */
 h1{
 /*@editable*/color:#222222;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:40px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Page
 @section Heading 2
 @style heading 2
 */
 h2{
 /*@editable*/color:#f2672a;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:34px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Page
 @section Heading 3
 @style heading 3
 */
 h3{
 /*@editable*/color:#232f3e;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:22px;
 /*@editable*/font-style:normal;
 /*@editable*/font-weight:bold;
 /*@editable*/line-height:150%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:left;
 }
 /*
 @tab Page
 @section Heading 4
 @style heading 4
 */
 h4{
 /*@editable*/color:#232f3e;
 /*@editable*/font-family:Georgia;
 /*@editable*/font-size:20px;
 /*@editable*/font-style:italic;
 /*@editable*/font-weight:normal;
 /*@editable*/line-height:125%;
 /*@editable*/letter-spacing:normal;
 /*@editable*/text-align:center;
 }
 /*
 @tab Header
 @section Header Container Style
 */
 #templateHeader{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:24px;
 /*@editable*/padding-bottom:0px;
 }
 /*
 @tab Header
 @section Header Interior Style
 */
 .headerContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Header
 @section Header Text
 */
 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
 /*@editable*/color:#757575;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:16px;
 /*@editable*/line-height:150%;
 /*@editable*/text-align:left;
 /*@editable*/font-weight: 400;;
 
 }
 /*
 @tab Header
 @section Header Link
 */
 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
 /*@editable*/color:#007C89;
 /*@editable*/font-weight:normal;
 /*@editable*/text-decoration:underline;
 }
 /*
 @tab Body
 @section Body Container Style
 */
 #templateBody{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Body
 @section Body Interior Style
 */
 .bodyContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:1px none ;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Body
 @section Body Text
 */
 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
 /*@editable*/color:#757575;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:16px;
 /*@editable*/line-height:150%;
 /*@editable*/text-align:left;
 }
 /*
 @tab Body
 @section Body Link
 */
 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
 /*@editable*/color:#2f53d7;
 /*@editable*/font-weight:normal;
 /*@editable*/text-decoration:underline;
 }
 /*
 @tab Footer
 @section Footer Style
 */
 #templateFooter{
 /*@editable*/background-color:#ffffff;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:0;
 /*@editable*/border-bottom:1px none ;
 /*@editable*/padding-top:16px;
 /*@editable*/padding-bottom:24px;
 }
 /*
 @tab Footer
 @section Footer Interior Style
 */
 .footerContainer{
 /*@editable*/background-color:#transparent;
 /*@editable*/background-image:none;
 /*@editable*/background-repeat:no-repeat;
 /*@editable*/background-position:center;
 /*@editable*/background-size:cover;
 /*@editable*/border-top:1px none ;
 /*@editable*/border-bottom:0;
 /*@editable*/padding-top:0;
 /*@editable*/padding-bottom:0;
 }
 /*
 @tab Footer
 @section Footer Text
 */
 p{
 /*@editable*/color:#adadae;
 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
 /*@editable*/font-size:12px;
 /*@editable*/font-weight:400;
 /*@editable*/line-height:125%;
 /*@editable*/text-align:left;
 /*@editable*/letter-spacing:0.24px;
 }
 /*
 @tab Footer
 @section Footer Link
 */
 	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 1
 @tip Make the first-level headings larger in size for better readability on small screens.
 */
 h1{
 /*@editable*/font-size:30px !important;
 /*@editable*/line-height:125% !important;
 }
 }	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 2
 @tip Make the second-level headings larger in size for better readability on small screens.
 */
 h2{
 /*@editable*/font-size:26px !important;
 /*@editable*/line-height:125% !important;
 /*@editable*/color:#f2672a !important;
 
 }
 }	@media only screen and (max-width: 480px){
 /*
 @tab Mobile Styles
 @section Heading 3
 @tip Make the third-level headings larger in size for better readability on small screens.
 */
 h3{
 /*@editable*/font-size:20px !important;
 /*@editable*/line-height:150% !important;
 }
 }	@media only screen and (max-width: 480px) {
 /*
 @tab Mobile Styles
 @section Heading 4
 @tip Make the fourth-level headings larger in size for better readability on small screens.
 */
 h4{
 /*@editable*/font-size:18px !important;
 /*@editable*/line-height:150% !important;
 }
 }	
</style>
<center>
<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
	<tbody>
		<tr>
			<td align="center" id="bodyCell" valign="top">
				<table border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody>
						<tr>
							<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
								<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
									<tbody>
										<tr>
											<td class="headerContainer" valign="top">
												<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
													<tbody>
														<tr>
															<td class="headerContainer" valign="top">
															<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																<tbody class="mcnTextBlockOuter">
																	<tr>
																		<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															</td>
														</tr>
													</tbody>
												</table>
												<!-- ===== middle content Start===== -->
												<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
													<tbody>
														<tr>
															<td class="headerContainer" valign="top">
															<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																<tbody class="mcnTextBlockOuter">
																	<tr>
																		<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																						<h2 style="font-size: 24px; color: #f2672a;">Hey Shopper</h2>
																						<h4 style="font-size: 20px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;"> Congratulations! Your email has been successfully verified </h4>
																						<p style="text-align: center; font-size: 16px;"> 
																							kindly login to the merchant portal of DB Houz with your registered email ID and get started soonest possible. 
																						</p>
																						<!-- <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">Verify Email </button> -->
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																						<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																							<tbody>
																								<tr>
																									<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																										<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																			<tbody>
																				<tr>
																					<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																						<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<!-- ===== middle content End===== -->
							</td>
						</tr>
						<tr>
							
						</tr>

						<!-- ===== footer -->
						
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
</center>
			</div>`
		case "User Order Placed":
			return `<div>
			 <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			 <style type="text/css">p{
			  margin:8px 0;
			  padding:0;
			  }
			  table{
			  border-collapse:collapse;
			  }
			  h1,h2,h3,h4,h5,h6{
			  display:block;
			  margin:0;
			  padding:0;
			  }
			  img,a img{
			  border:0;
			  height:auto;
			  outline:none;
			  text-decoration:none;
			  }
			  body,#bodyTable,#bodyCell{
			  height:100%;
			  margin:0;
			  padding:0;
			  width:100%;
			  font-family: 'Roboto', Arial,sans-serif;
			  }
			  .mcnPreviewText{
			  display:none !important;
			  }
			  #outlook a{
			  padding:0;
			  }
			  img{
			  -ms-interpolation-mode:bicubic;
			  }
			  table{
			  mso-table-lspace:0pt;
			  mso-table-rspace:0pt;
			  }
			  .ReadMsgBody{
			  width:100%;
			  }
			  .ExternalClass{
			  width:100%;
			  }
			  p,a,li,td,blockquote{
			  mso-line-height-rule:exactly;
			  }
			  a[href^=tel],a[href^=sms]{
			  color:inherit;
			  cursor:default;
			  text-decoration:none;
			  }
			  p,a,li,td,body,table,blockquote{
			  -ms-text-size-adjust:100%;
			  -webkit-text-size-adjust:100%;
			  }
			  .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			  line-height:100%;
			  }
			  a[x-apple-data-detectors]{
			  color:inherit !important;
			  text-decoration:none !important;
			  font-size:inherit !important;
			  font-family:inherit !important;
			  font-weight:inherit !important;
			  line-height:inherit !important;
			  }
			  .templateContainer{
			  max-width:600px !important;
			  }
			  a.mcnButton{
			  display:block;
			  }
			  .mcnImage,.mcnRetinaImage{
			  vertical-align:bottom;
			  }
			  .mcnTextContent{
			  word-break:break-word;
			  }
			  .mcnTextContent img{
			  height:auto !important;
			  }
			  .mcnDividerBlock{
			  table-layout:fixed !important;
			  }
			  /*
			  @tab Page
			  @section Heading 1
			  @style heading 1
			  */
			  h1{
			  /*@editable*/color:#222222;
			  /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			  /*@editable*/font-size:40px;
			  /*@editable*/font-style:normal;
			  /*@editable*/font-weight:bold;
			  /*@editable*/line-height:150%;
			  /*@editable*/letter-spacing:normal;
			  /*@editable*/text-align:center;
			  }
			  /*
			  @tab Page
			  @section Heading 2
			  @style heading 2
			  */
			  h2{
			  /*@editable*/color:#f2672a;
			  /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			  /*@editable*/font-size:34px;
			  /*@editable*/font-style:normal;
			  /*@editable*/font-weight:bold;
			  /*@editable*/line-height:150%;
			  /*@editable*/letter-spacing:normal;
			  /*@editable*/text-align:center;
			  }
			  /*
			  @tab Page
			  @section Heading 3
			  @style heading 3
			  */
			  h3{
			  /*@editable*/color:#232f3e;
			  /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			  /*@editable*/font-size:22px;
			  /*@editable*/font-style:normal;
			  /*@editable*/font-weight:bold;
			  /*@editable*/line-height:150%;
			  /*@editable*/letter-spacing:normal;
			  /*@editable*/text-align:left;
			  }
			  /*
			  @tab Page
			  @section Heading 4
			  @style heading 4
			  */
			  h4{
			  /*@editable*/color:#232f3e;
			  /*@editable*/font-family:Georgia;
			  /*@editable*/font-size:20px;
			  /*@editable*/font-style:italic;
			  /*@editable*/font-weight:normal;
			  /*@editable*/line-height:125%;
			  /*@editable*/letter-spacing:normal;
			  /*@editable*/text-align:center;
			  }
			  /*
			  @tab Header
			  @section Header Container Style
			  */
			  #templateHeader{
			  /*@editable*/background-color:#ffffff;
			  /*@editable*/background-image:none;
			  /*@editable*/background-repeat:no-repeat;
			  /*@editable*/background-position:center;
			  /*@editable*/background-size:cover;
			  /*@editable*/border-top:0;
			  /*@editable*/border-bottom:0;
			  /*@editable*/padding-top:24px;
			  /*@editable*/padding-bottom:0px;
			  }
			  /*
			  @tab Header
			  @section Header Interior Style
			  */
			  .headerContainer{
			  /*@editable*/background-color:#transparent;
			  /*@editable*/background-image:none;
			  /*@editable*/background-repeat:no-repeat;
			  /*@editable*/background-position:center;
			  /*@editable*/background-size:cover;
			  /*@editable*/border-top:0;
			  /*@editable*/border-bottom:0;
			  /*@editable*/padding-top:0;
			  /*@editable*/padding-bottom:0;
			  }
			  /*
			  @tab Header
			  @section Header Text
			  */
			  .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			  /*@editable*/color:#757575;
			  /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			  /*@editable*/font-size:16px;
			  /*@editable*/line-height:150%;
			  /*@editable*/text-align:left;
			  /*@editable*/font-weight: 400;;
			  
			  }
			  /*
			  @tab Header
			  @section Header Link
			  */
			  .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			  /*@editable*/color:#007C89;
			  /*@editable*/font-weight:normal;
			  /*@editable*/text-decoration:underline;
			  }
			  /*
			  @tab Body
			  @section Body Container Style
			  */
			  #templateBody{
			  /*@editable*/background-color:#ffffff;
			  /*@editable*/background-image:none;
			  /*@editable*/background-repeat:no-repeat;
			  /*@editable*/background-position:center;
			  /*@editable*/background-size:cover;
			  /*@editable*/border-top:0;
			  /*@editable*/border-bottom:0;
			  /*@editable*/padding-top:0;
			  /*@editable*/padding-bottom:0;
			  }
			  /*
			  @tab Body
			  @section Body Interior Style
			  */
			  .bodyContainer{
			  /*@editable*/background-color:#transparent;
			  /*@editable*/background-image:none;
			  /*@editable*/background-repeat:no-repeat;
			  /*@editable*/background-position:center;
			  /*@editable*/background-size:cover;
			  /*@editable*/border-top:0;
			  /*@editable*/border-bottom:1px none ;
			  /*@editable*/padding-top:0;
			  /*@editable*/padding-bottom:0;
			  }
			  /*
			  @tab Body
			  @section Body Text
			  */
			  .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			  /*@editable*/color:#757575;
			  /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			  /*@editable*/font-size:16px;
			  /*@editable*/line-height:150%;
			  /*@editable*/text-align:left;
			  }
			  /*
			  @tab Body
			  @section Body Link
			  */
			  .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			  /*@editable*/color:#2f53d7;
			  /*@editable*/font-weight:normal;
			  /*@editable*/text-decoration:underline;
			  }
			  /*
			  @tab Footer
			  @section Footer Style
			  */
			  #templateFooter{
			  /*@editable*/background-color:#ffffff;
			  /*@editable*/background-image:none;
			  /*@editable*/background-repeat:no-repeat;
			  /*@editable*/background-position:center;
			  /*@editable*/background-size:cover;
			  /*@editable*/border-top:0;
			  /*@editable*/border-bottom:1px none ;
			  /*@editable*/padding-top:16px;
			  /*@editable*/padding-bottom:24px;
			  }
			  /*
			  @tab Footer
			  @section Footer Interior Style
			  */
			  .footerContainer{
			  /*@editable*/background-color:#transparent;
			  /*@editable*/background-image:none;
			  /*@editable*/background-repeat:no-repeat;
			  /*@editable*/background-position:center;
			  /*@editable*/background-size:cover;
			  /*@editable*/border-top:1px none ;
			  /*@editable*/border-bottom:0;
			  /*@editable*/padding-top:0;
			  /*@editable*/padding-bottom:0;
			  }
			  /*
			  @tab Footer
			  @section Footer Text
			  */
			  p{
			  /*@editable*/color:#adadae;
			  /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			  /*@editable*/font-size:12px;
			  /*@editable*/font-weight:400;
			  /*@editable*/line-height:125%;
			  /*@editable*/text-align:left;
			  /*@editable*/letter-spacing:0.24px;
			  }
			  /*
			  @tab Footer
			  @section Footer Link
			  */
				  @media only screen and (max-width: 480px){
			  /*
			  @tab Mobile Styles
			  @section Heading 1
			  @tip Make the first-level headings larger in size for better readability on small screens.
			  */
			  h1{
			  /*@editable*/font-size:30px !important;
			  /*@editable*/line-height:125% !important;
			  }
			  }	@media only screen and (max-width: 480px){
			  /*
			  @tab Mobile Styles
			  @section Heading 2
			  @tip Make the second-level headings larger in size for better readability on small screens.
			  */
			  h2{
			  /*@editable*/font-size:26px !important;
			  /*@editable*/line-height:125% !important;
			  /*@editable*/color:#f2672a !important;
			  
			  }
			  }	@media only screen and (max-width: 480px){
			  /*
			  @tab Mobile Styles
			  @section Heading 3
			  @tip Make the third-level headings larger in size for better readability on small screens.
			  */
			  h3{
			  /*@editable*/font-size:20px !important;
			  /*@editable*/line-height:150% !important;
			  }
			  }	@media only screen and (max-width: 480px) {
			  /*
			  @tab Mobile Styles
			  @section Heading 4
			  @tip Make the fourth-level headings larger in size for better readability on small screens.
			  */
			  h4{
			  /*@editable*/font-size:18px !important;
			  /*@editable*/line-height:150% !important;
			  }
			  }	
			 </style>
			 <center>
			 <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				 <tbody>
					 <tr>
						 <td align="center" id="bodyCell" valign="top">
							 <table border="0" cellpadding="0" cellspacing="0" width="100%">
								 <tbody>
									 <tr>
										 <td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											 <table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												 <tbody>
													 <tr>
														 <td class="headerContainer" valign="top">
															 <table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																 <tbody>
																	 <tr>
																		 <td class="headerContainer" valign="top">
																		 <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			 <tbody class="mcnTextBlockOuter">
																				 <tr>
																					 <td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						 <tbody>
																							 <tr>
																								 <td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: -1.2px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							 </tr>
																						 </tbody>
																					 </table>
																					 </td>
																				 </tr>
																			 </tbody>
																		 </table>
																		 </td>
																	 </tr>
																 </tbody>
															 </table>
															 <!-- ===== middle content Start===== -->
															 <table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																 <tbody>
																	 <tr>
																		 <td class="headerContainer" valign="top">
																		 <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			 <tbody class="mcnTextBlockOuter">
																				 <tr>
																					 <td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						 <tbody>
																							 <tr>
																								 <td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">
																									 <h2 style="font-size: 24px; color: #f2672a;">Hey ${message.customerDetail.name},</h2>
																									 <h4 style="font-size: 20px; margin: 0; color: #232f3e; font-family:Georgia;font-style:italic;">Thank you for your purchase from DBHouz.com</h4>
																									 <p style="text-align: center;">Your order has been successfully placed. It is expected to be shipped by ${formatted_date(message.createdAt)}. </p>
																									 
																								 </td>
																							 </tr>
																						 </tbody>
																					 </table>
																					 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						 <tbody>
																							 <tr>
																								 <td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">																	
																									 
																									 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										 <tbody>
																											 <tr>
																												 <td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													 <h3 style="text-align: center; color: #232f3e; margin: 0; padding-bottom: 10px;">Below are your order details	</h3>
																													 <!-- <p style="text-align: center;"> </p> -->
																												 </td>
																											 </tr>
																										 </tbody>
																									 </table>
																									 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; text-align: center;" width="100%">
																										 <tbody>
																											 
																											 <tr>
																												 <td class="mcnTextContent" style="padding: 10px 20px 10px 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17; background-color: #ffebe2;border-radius: 6px;" valign="top">
																													 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; " width="100%">
																														 <tbody>
																															 <tr>
																																 <td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	 <p style="font-size: 14px; margin: 3px 0; color: #555;">Order ID:</p>
																																 </td>
																																 <td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	 <p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message._id}</p>
																																 </td>
																															 </tr>
																															 <tr>
																																 <td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	 <p style="font-size: 14px; margin: 3px 0; color: #555;">Order date :</p>
																																 </td>
																																 <td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	 <p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${formatted_date(message.createdAt)}</p>
																																 </td>
																															 </tr>
																															 <tr>
																																 <td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	 <p style="font-size: 14px; margin: 3px 0; color: #555;">Shipping address:</p>
																																 </td>
																																 <td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	 <p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.address.main_address_text} ${message.address.city} ${message.address.state} ${message.address.country} (${message.address.postal_code})</p>
																																 </td>
																															 </tr>
																														 </tbody>
																													 </table>
																													 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-top: 20px;" width="100%">
																														 <tbody>
																															 <tr>
																																 <td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;text-align:center; line-height: 1.17; padding-right: 5px;" width="50%" valign="top">
																																	 <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;"> You Can Download Your Invoice From Your Order History </button>
																																 </td>
																															 </tr>
																														 </tbody>
																													 </table>
																												 </td>
																											 </tr>
																										 </tbody>
																									 </table>
																									 
																									 
																									 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px; margin-top: 20px;" width="100%">
																										 <tbody>
																											 <tr>
																												 <td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																													 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																														 <tbody>
																															 <tr>
																																 <td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																																	 <p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																																 </td>
																															 </tr>
																														 </tbody>
																													 </table>
																												 </td>
																											 </tr>
																										 </tbody>
																									 </table>
																								 </td>
																							 </tr>
																						 </tbody>
																					 </table>
																					 <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						 <tbody>
																							 <tr>
																								 <td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">
																									 <img style="max-width: 100%;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" />
																								 </td>
																							 </tr>
																						 </tbody>
																					 </table>
																					 </td>
																				 </tr>
																			 </tbody>
																		 </table>
																		 </td>
																	 </tr>
																 </tbody>
															 </table>
														 </td>
													 </tr>
												 </tbody>
											 </table>
											 <!-- ===== middle content End===== -->
										 </td>
									 </tr>
									 <tr>
										 
									 </tr>
			 
									 <!-- ===== footer -->
									 
								 </tbody>
							 </table>
						 </td>
					 </tr>
				 </tbody>
			 </table>
			 </center>
			</div>
			`
		case "merchant account documents approved":
			return `<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message.merchantName}</h2>
																									<h4 style="font-size: 20px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;"> We are glad to inform you that your submitted document ${message.message} for DB Houz verification have been approved.  </h4>
																									<p style="text-align: center; font-size: 16px;"> 
																										Kindly check and upload relevant documents to move forward. For more information or concern. Kindly contact <a href="mailto:support@dbhouz.com">support@dbhouz.com</a>
																									</p>
																									<!-- <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">Verify Email </button> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<!-- <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																					
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="height: 1px; background-color: #eee;"></p>
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top"></td>
																											</tr>
																										</tbody>
																									</table> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																									<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>`
		case "merchant account documents reject":
			return `<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message.merchantName}</h2>
																									<h4 style="font-size: 20px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;"> We regret to inform you that your submitted document ${message.message} for DB Houz verification have been disapproved.  </h4>
																									<p style="text-align: center; font-size: 16px;"> 
																										Kindly check and upload relevant documents to move forward. For more information or concern. Kindly contact <a href="mailto:support@dbhouz.com">support@dbhouz.com</a>
																									</p>
																									<!-- <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">Verify Email </button> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<!-- <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																					
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="height: 1px; background-color: #eee;"></p>
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top"></td>
																											</tr>
																										</tbody>
																									</table> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																									<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
		</div>`
		case "merchant activated":
			return `
			<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; text-align: center;" valign="top">
																									<div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style=" width: 210px; height: 40px !important; display: inline-block;" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message}</h2>
																									<h4 style="font-size: 20px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;"> What a great day it is! Congratulations on getting onboarded as a merchant on DB houz.  </h4>
																									<p style="text-align: center; font-size: 16px;"> 
																										You can now log into your merchant account by using your registered email address.
																										For more information or concern.  kindly contact <a href="mailto:support@dbhouz.com">support@dbhouz.com</a>
																									</p>
																									<!-- <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">Verify Email </button> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; text-align:center; " valign="top">
																									<div><img style="max-width: 100%; height: 240px; display: inline-block;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>
			`
		case "merchant deactivated":
			`<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message}</h2>
																									<h4 style="font-size: 20px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;"> We are sorry to inform you that your account has been deactivated.  </h4>
																									<p style="text-align: center; font-size: 16px;"> 
																										Please mail to <a href="mailto:support@dbhouz.com">support@dbhouz.com</a> to get your account activated as soon as possible. We are waiting to get you onboard again! For more information or concern. kindly contact <a href="mailto:support@dbhouz.com">support@dbhouz.com</a>
																									</p>
																									<!-- <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">Verify Email </button> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																									<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>`
		case "Merchant Order Placed":
			return`<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message.merchantName}</h2> 
																									<h4 style="font-size: 18px; margin: 0; color: #232f3e; font-family:Georgia;font-style:italic;">You’ll be glad to know that a new order has been placed by Shopper</h4>
																									<!-- <p style="text-align: center;">A New Shopper has signed up recently on DB Houz Shopper portal</p> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<h3 style="text-align: center; color: #232f3e;">Shopper Details</h3>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																					
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="height: 1px; background-color: #eee;"></p>
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; text-align: center;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17;" valign="top">
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left;" width="50%" valign="top">
																																	<p>Full Name:</p>
																																</td>
																																<td class="mcnTextContent" style=" font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right;" width="50%" valign="top">
																																	<p style="text-align: right;">${message.orderData.customerDetail.name}</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left;" width="50%" valign="top">
																																	<p>Phone:</p>
																																</td>
																																<td class="mcnTextContent" style=" font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right;" width="50%" valign="top">
																																	<p style="text-align: right; color: #757575;">${message.orderData.customerDetail.phone}</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left;" width="50%" valign="top">
																																	<p>Billing Address:</p>
																																</td>
																																<td class="mcnTextContent" style=" font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right;" width="50%" valign="top">
																																	<p style="text-align: right;">${message.orderData.address.main_address_text} ${message.orderData.address.city} ${message.orderData.address.state} ${message.orderData.address.country} (${message.orderData.address.postal_code})</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left;" width="50%" valign="top">
																																	<p>Mode of Payment:</p>
																																</td>
																																<td class="mcnTextContent" style=" font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right;" width="50%" valign="top">
																																	<p style="text-align: right; color: #757575;">${message.orderData.transactionDetail.transactionMethod}</p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																							<tr>
																								<td class="mcnTextContent" style="padding: 30px 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<h3 style="text-align: center; color: #232f3e;">Order Details</h3>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																					
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="height: 1px; background-color: #eee;"></p>
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; text-align: center;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17;" valign="top">
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left;" width="50%" valign="top">
																																	<p>Order Number:</p>
																																</td>
																																<td class="mcnTextContent" style=" font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right;" width="50%" valign="top">
																																	<p style="text-align: right;">${message.orderData._id}</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left;" width="50%" valign="top">
																																	<p>Order Date:</p>
																																</td>
																																<td class="mcnTextContent" style=" font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 16px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right;" width="50%" valign="top">
																																	<p style="text-align: right; color: #757575;">${formatted_date(message.orderData.createdAt)}</p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>`
		case "Merchant Product Activated":
			return`
			<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: -1.2px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message.merchantName}</h2>
																									<h4 style="font-size: 20px; margin: 0; color: #232f3e; font-family:Georgia;font-style:italic;">You'll be happy to know that the admin has activated your registered products</h4>
																									
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">																	
																									<!-- <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">
																													<h3 style="text-align: center; color: #232f3e;">Product Details</h3>
																												</td>
																											</tr>
																										</tbody>
																									</table> -->
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<h3 style="text-align: center; color: #232f3e; margin: 0; padding-bottom: 10px;">Product Details</h3>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; text-align: center;" width="100%">
																										<tbody>
																											
																											<tr>
																												<td class="mcnTextContent" style="padding: 10px 20px 10px 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17; background-color: #ffebe2;border-radius: 6px;" valign="top">
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; " width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Product Name::</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.product.name}</p>
																																</td>
																															</tr>
																															<!-- <tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Variant:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">100 Foot/dark red</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Price:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">&pound;98.40</p>
																																</td>
																															</tr> -->
																															<!-- <tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Merchant Name:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">Steve Roggers</p>
																																</td>
																															</tr> -->
																															
																														</tbody>
																													</table>
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-top: 20px;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;text-align:right; line-height: 1.17; padding-right: 5px;" width="50%" valign="top">
																																	<p style="text-align: center; font-size: 14px;"> 
																																		For more information or concern. kindly contact <a href="mailto:support@dbhouz.com">support@dbhouz.com</a>
																																	</p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									
																									
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px; margin-top: 20px;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">
																									<img style="max-width: 100%;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" />
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>`
		case "Merchant Product Deactivated":
			return`
			<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: -1.2px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message.merchantName}</h2>
																									<h4 style="font-size: 20px; margin: 0; color: #232f3e; font-family:Georgia;font-style:italic;">We are sorry to inform you that your product has been deactivated</h4>
																									
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">																	
																									
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<h3 style="text-align: center; color: #232f3e; margin: 0; padding-bottom: 10px;">Product Details</h3>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; text-align: center;" width="100%">
																										<tbody>
																											
																											<tr>
																												<td class="mcnTextContent" style="padding: 10px 20px 10px 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17; background-color: #ffebe2;border-radius: 6px;" valign="top">
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; " width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Product Name::</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.product.name}</p>
																																</td>
																															</tr>
																															<!-- <tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Variant:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">100 Foot/dark red</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Price:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">&pound;98.40</p>
																																</td>
																															</tr> -->
																															<!-- <tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Merchant Name:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">Steve Roggers</p>
																																</td>
																															</tr> -->
																															
																														</tbody>
																													</table>
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-top: 20px;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;text-align:right; line-height: 1.17; padding-right: 5px;" width="50%" valign="top">
																																	<p style="text-align: center; font-size: 14px;"> 
																																		For more information or concern. kindly contact <a href="mailto:support@dbhouz.com">support@dbhouz.com</a>
																																	</p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									
																									
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px; margin-top: 20px;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">
																									<img style="max-width: 100%;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" />
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>`
		case "Merchant got review":
			return `<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, ${message.merchantName}</h2>
																									<h4 style="font-size: 26px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;">You have received a review on your product </h4>
																									<!-- <p style="text-align: center;">You are almost ready to get started! Please click on the below button to verify your email address.</p>
																									 -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: -1.2px;line-height: 1.17;text-align:center;" valign="top">																	
																									
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<h3 style="text-align: center; color: #232f3e; margin: 0; padding-bottom: 10px;">Product Details</h3>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; text-align: center;" width="100%">
																										<tbody>
																											
																											<tr>
																												<td class="mcnTextContent" style="padding: 10px 20px 10px 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;text-align: left;letter-spacing: 0px;line-height: 1.17; background-color: #ffebe2;border-radius: 6px;" valign="top">
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; " width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Product Name::</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.productName}</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Customer Name:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.userName}</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Review Comment:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.reviewDescription}</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Rating:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.rating}</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Review Id:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">${message.reviewId}</p>
																																</td>
																															</tr>
																															<!-- <tr>
																																<td class="mcnTextContent" style="padding: 3px 0; margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:left; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555;">Merchant Name:</p>
																																</td>
																																<td class="mcnTextContent" style="padding: 3px 0;  font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:right; border-bottom: 1px dashed #f3cdbc" width="50%" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0;text-align: right; color: #555;">Steve Roggers</p>
																																</td>
																															</tr> -->
																														</tbody>
																													</table>
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-top: 20px;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;text-align:right; line-height: 1.17; padding-right: 5px;" width="50%" valign="top">
																																	<p style="text-align: center; font-size: 16px; padding: 0 40px"> 
																																		You can also view the review on your products by clicking on the button below. 
																																		<br> <br>
																																		 <button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">View Review </button>
																																	</p>
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;text-align:right; line-height: 1.17; padding-right: 5px;" width="50%" valign="top">
																																	<hr style="border-color: #ffd4c1; opacity: 0.2;">
																																</td>
																															</tr>
																															<tr>
																																<td class="mcnTextContent" style="margin:0; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 14px;font-style: normal;letter-spacing: 0px;text-align:right; line-height: 1.17; padding-right: 5px;" width="50%" valign="top">
																																	<p style="text-align: center; font-size: 14px;"> 
																																		For more information or concern. kindly contact <a href="mailto:support@dbhouz.com">support@dbhouz.com</a>
																																	</p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									
																									
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;  margin-top: 20px;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																													<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																														<tbody>
																															<tr>
																																<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																																	<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																									<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>`
		case "forgot-password":
			return `<div>
			<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
			<style type="text/css">p{
			 margin:8px 0;
			 padding:0;
			 }
			 table{
			 border-collapse:collapse;
			 }
			 h1,h2,h3,h4,h5,h6{
			 display:block;
			 margin:0;
			 padding:0;
			 }
			 img,a img{
			 border:0;
			 height:auto;
			 outline:none;
			 text-decoration:none;
			 }
			 body,#bodyTable,#bodyCell{
			 height:100%;
			 margin:0;
			 padding:0;
			 width:100%;
			 font-family: 'Roboto', Arial,sans-serif;
			 }
			 .mcnPreviewText{
			 display:none !important;
			 }
			 #outlook a{
			 padding:0;
			 }
			 img{
			 -ms-interpolation-mode:bicubic;
			 }
			 table{
			 mso-table-lspace:0pt;
			 mso-table-rspace:0pt;
			 }
			 .ReadMsgBody{
			 width:100%;
			 }
			 .ExternalClass{
			 width:100%;
			 }
			 p,a,li,td,blockquote{
			 mso-line-height-rule:exactly;
			 }
			 a[href^=tel],a[href^=sms]{
			 color:inherit;
			 cursor:default;
			 text-decoration:none;
			 }
			 p,a,li,td,body,table,blockquote{
			 -ms-text-size-adjust:100%;
			 -webkit-text-size-adjust:100%;
			 }
			 .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			 line-height:100%;
			 }
			 a[x-apple-data-detectors]{
			 color:inherit !important;
			 text-decoration:none !important;
			 font-size:inherit !important;
			 font-family:inherit !important;
			 font-weight:inherit !important;
			 line-height:inherit !important;
			 }
			 .templateContainer{
			 max-width:600px !important;
			 }
			 a.mcnButton{
			 display:block;
			 }
			 .mcnImage,.mcnRetinaImage{
			 vertical-align:bottom;
			 }
			 .mcnTextContent{
			 word-break:break-word;
			 }
			 .mcnTextContent img{
			 height:auto !important;
			 }
			 .mcnDividerBlock{
			 table-layout:fixed !important;
			 }
			 /*
			 @tab Page
			 @section Heading 1
			 @style heading 1
			 */
			 h1{
			 /*@editable*/color:#222222;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:40px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 2
			 @style heading 2
			 */
			 h2{
			 /*@editable*/color:#f2672a;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:34px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Page
			 @section Heading 3
			 @style heading 3
			 */
			 h3{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:22px;
			 /*@editable*/font-style:normal;
			 /*@editable*/font-weight:bold;
			 /*@editable*/line-height:150%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Page
			 @section Heading 4
			 @style heading 4
			 */
			 h4{
			 /*@editable*/color:#232f3e;
			 /*@editable*/font-family:Georgia;
			 /*@editable*/font-size:20px;
			 /*@editable*/font-style:italic;
			 /*@editable*/font-weight:normal;
			 /*@editable*/line-height:125%;
			 /*@editable*/letter-spacing:normal;
			 /*@editable*/text-align:center;
			 }
			 /*
			 @tab Header
			 @section Header Container Style
			 */
			 #templateHeader{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:24px;
			 /*@editable*/padding-bottom:0px;
			 }
			 /*
			 @tab Header
			 @section Header Interior Style
			 */
			 .headerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Header
			 @section Header Text
			 */
			 .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 /*@editable*/font-weight: 400;;
			 
			 }
			 /*
			 @tab Header
			 @section Header Link
			 */
			 .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
			 /*@editable*/color:#007C89;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Body
			 @section Body Container Style
			 */
			 #templateBody{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Interior Style
			 */
			 .bodyContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Body
			 @section Body Text
			 */
			 .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
			 /*@editable*/color:#757575;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:16px;
			 /*@editable*/line-height:150%;
			 /*@editable*/text-align:left;
			 }
			 /*
			 @tab Body
			 @section Body Link
			 */
			 .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
			 /*@editable*/color:#2f53d7;
			 /*@editable*/font-weight:normal;
			 /*@editable*/text-decoration:underline;
			 }
			 /*
			 @tab Footer
			 @section Footer Style
			 */
			 #templateFooter{
			 /*@editable*/background-color:#ffffff;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:0;
			 /*@editable*/border-bottom:1px none ;
			 /*@editable*/padding-top:16px;
			 /*@editable*/padding-bottom:24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Interior Style
			 */
			 .footerContainer{
			 /*@editable*/background-color:#transparent;
			 /*@editable*/background-image:none;
			 /*@editable*/background-repeat:no-repeat;
			 /*@editable*/background-position:center;
			 /*@editable*/background-size:cover;
			 /*@editable*/border-top:1px none ;
			 /*@editable*/border-bottom:0;
			 /*@editable*/padding-top:0;
			 /*@editable*/padding-bottom:0;
			 }
			 /*
			 @tab Footer
			 @section Footer Text
			 */
			 p{
			 /*@editable*/color:#adadae;
			 /*@editable*/font-family: 'Roboto', Arial,sans-serif;
			 /*@editable*/font-size:12px;
			 /*@editable*/font-weight:400;
			 /*@editable*/line-height:125%;
			 /*@editable*/text-align:left;
			 /*@editable*/letter-spacing:0.24px;
			 }
			 /*
			 @tab Footer
			 @section Footer Link
			 */
				 @media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 1
			 @tip Make the first-level headings larger in size for better readability on small screens.
			 */
			 h1{
			 /*@editable*/font-size:30px !important;
			 /*@editable*/line-height:125% !important;
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 2
			 @tip Make the second-level headings larger in size for better readability on small screens.
			 */
			 h2{
			 /*@editable*/font-size:26px !important;
			 /*@editable*/line-height:125% !important;
			 /*@editable*/color:#f2672a !important;
			 
			 }
			 }	@media only screen and (max-width: 480px){
			 /*
			 @tab Mobile Styles
			 @section Heading 3
			 @tip Make the third-level headings larger in size for better readability on small screens.
			 */
			 h3{
			 /*@editable*/font-size:20px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	@media only screen and (max-width: 480px) {
			 /*
			 @tab Mobile Styles
			 @section Heading 4
			 @tip Make the fourth-level headings larger in size for better readability on small screens.
			 */
			 h4{
			 /*@editable*/font-size:18px !important;
			 /*@editable*/line-height:150% !important;
			 }
			 }	
			</style>
			<center>
			<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" width="100%">
				<tbody>
					<tr>
						<td align="center" id="bodyCell" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tbody>
									<tr>
										<td align="center" data-template-container="" id="templateHeader" style="background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0px;" valign="top">
											<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 600px !important;background: #fff; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 30px; margin-top: 30px;" width="100%">
												<tbody>
													<tr>
														<td class="headerContainer" valign="top">
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 10px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%; margin-top: 50px;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: center;letter-spacing: 0px;line-height: 1.17;" valign="top"><div><img src="http://165.22.208.19:12001/rest/documents/get/63ad80696a71abcc0e76b12e" style="max-width: 100%; width: 210px; height: 40px" /></div></td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
															<!-- ===== middle content Start===== -->
															<table align="center" border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="background: #fff; margin-bottom: 50px;" width="100%">
																<tbody>
																	<tr>
																		<td class="headerContainer" valign="top">
																		<table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="min-width:100%;" width="100%">
																			<tbody class="mcnTextBlockOuter">
																				<tr>
																					<td class="mcnTextBlockInner" style="padding-top: 20px;" valign="top">
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 30px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																									<h2 style="font-size: 24px; color: #f2672a;">Hey Merchant, Shubhi</h2>
																									<h4 style="font-size: 26px; color: #232f3e; font-family:Georgia;font-style:italic; margin: 0;">Forgot your password?  </h4>
																									<p style="text-align: center;">We received a request to reset the password of your account. To reset the password, click on the below button.</p>
																									<a href='http://165.22.208.19/merchant/forgot-password'><button style=" background-color: transparent;outline: 0;border: 0;background: #f2672a;padding: 5px 10px;color: #fff;border-radius: 3px; cursor: pointer;">Reset Password </button></a>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%; margin-bottom: 20px;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																	
																									<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="font-size: 14px; margin: 3px 0; color: #555; text-align:center;"><b>Thank You | Support Team | DB Houz </b></p>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																									<!-- <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																										<tbody>
																											<tr>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">																					
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top">
																													<p style="height: 1px; background-color: #eee;"></p>
																												</td>
																												<td width="33.33%" class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;text-align: left;letter-spacing: 0px;line-height: 1.17;text-align:center;" valign="top"></td>
																											</tr>
																										</tbody>
																									</table> -->
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="max-width:100%; min-width:100%;" width="100%">
																						<tbody>
																							<tr>
																								<td class="mcnTextContent" style="padding: 0 20px 0 20px; font-family: 'Roboto', Arial,sans-serif, sans-serif;font-size: 20px;font-style: normal;font-weight: bold;letter-spacing: 0px;line-height: 1.17;text-align:center; " valign="top">
																									<div><img style="max-width: 100%; height: 240px;" src="http://165.22.208.19:12001/rest/documents/get/63ad7fd16a71abcc0e76b124" /></div>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!-- ===== middle content End===== -->
										</td>
									</tr>
									<tr>
										
									</tr>
			
									<!-- ===== footer -->
									
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			</center>
			</div>`
	}
}
export { EmailHTML }