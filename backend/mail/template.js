/* const generateTemplate = (options) => {
  const { title, message, link, logo, banner, btnTitle } = options;

  return `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        .menu_block.desktop_hide .menu-links span {
          mso-hide: all;
        }
  
        @media (max-width: 700px) {
          .desktop_hide table.icons-inner,
          .social_block.desktop_hide .social-table {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .image_block img.fullWidth {
            max-width: 100% !important;
          }
  
          .menu-checkbox[type="checkbox"] ~ .menu-links {
            display: none !important;
            padding: 5px 0;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-trigger .menu-open {
            display: none !important;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-links,
          .menu-checkbox[type="checkbox"] ~ .menu-trigger {
            display: block !important;
            max-width: none !important;
            max-height: none !important;
            font-size: inherit !important;
          }
  
          .menu-checkbox[type="checkbox"] ~ .menu-links > a,
          .menu-checkbox[type="checkbox"] ~ .menu-links > span.label {
            display: block !important;
            text-align: center;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-trigger .menu-close {
            display: block !important;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
  
        #memu-r7c0m2:checked ~ .menu-links {
          background-color: #000 !important;
        }
  
        #memu-r7c0m2:checked ~ .menu-links a,
        #memu-r7c0m2:checked ~ .menu-links span {
          color: #fff !important;
        }
      </style>
    </head>
  
    <body style="background-color: #fff0e3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff0e3">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 30px; line-height: 30px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="width: 100%; padding-right: 0px; padding-left: 0px">
                                    <div class="alignment" align="center" style="line-height: 10px"><img src=${logo} style="display: block; height: auto; border: 0; max-width: 147.33333333333331px; width: 100%" width="147.33333333333331" alt="Company Logo" title="Company Logo" /></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 10px; line-height: 10px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="width: 100%">
                                    <div class="alignment" align="center" style="line-height: 10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/round_corner_top.png" style="display: block; height: auto; border: 0; max-width: 680px; width: 100%" width="680" alt="Top round corners" title="Top round corners" /></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center" style="line-height: 10px"><img class="fullWidth" src=${banner} style="display: block; height: auto; border: 0; max-width: 374px; width: 100%" width="374" alt="Resetting Password" title="Resetting Password" /></div>
                                  </td>
                                </tr>
                              </table>
                              <div class="spacer_block block-2" style="height: 35px; line-height: 35px; font-size: 1px">&#8202;</div>
                              <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="text-align: center; width: 100%">
                                    <h1 style="margin: 0; color: #101010; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0"><strong> ${title}</strong></h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word">
                                <tr>
                                  <td class="pad" style="padding-bottom: 10px; padding-left: 20px; padding-right: 10px; padding-top: 10px">
                                    <div style="color: #848484; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 14px; line-height: 180%; text-align: center; mso-line-height-alt: 25.2px">
                                      <p style="margin: 0; word-break: break-word"><span> ${message}</span></p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <div class="spacer_block block-2" style="height: 10px; line-height: 10px; font-size: 1px">&#8202;</div>
                              <table class="button_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <a
                                        href=${link}
                                        target="_blank"
                                        style="text-decoration: none; display: inline-block; color: #ffffff; background-color: #101; border-radius: 4px; width: auto; border-top: 1px solid #101; font-weight: undefined; border-right: 1px solid #101; border-bottom: 1px solid #101; border-left: 1px solid #101; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 16px; text-align: center; mso-border-alt: none; word-break: keep-all"
                                        ><span style="padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal"><span style="word-break: break-word; line-height: 32px"> ${btnTitle}</span></span></a
                                      >
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <div class="spacer_block block-4" style="height: 20px; line-height: 20px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-3" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="width: 100%">
                                    <div class="alignment" align="center" style="line-height: 10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/round_corner_bottom.png" style="display: block; height: auto; border: 0; max-width: 679px; width: 100%" width="679" alt="Bottom round corners" title="Bottom round corners" /></div>
                                  </td>
                                </tr>
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
    </body>
  </html>
  `;
};

module.exports = generateTemplate;
 */

/*const generateTemplate = (options) => {
  const { title, message, link, btnTitle } = options;

  return `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        .menu_block.desktop_hide .menu-links span {
          mso-hide: all;
        }
  
        @media (max-width: 700px) {
          .desktop_hide table.icons-inner,
          .social_block.desktop_hide .social-table {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .image_block img.fullWidth {
            max-width: 100% !important;
          }
  
          .menu-checkbox[type="checkbox"] ~ .menu-links {
            display: none !important;
            padding: 5px 0;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-trigger .menu-open {
            display: none !important;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-links,
          .menu-checkbox[type="checkbox"] ~ .menu-trigger {
            display: block !important;
            max-width: none !important;
            max-height: none !important;
            font-size: inherit !important;
          }
  
          .menu-checkbox[type="checkbox"] ~ .menu-links > a,
          .menu-checkbox[type="checkbox"] ~ .menu-links > span.label {
            display: block !important;
            text-align: center;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-trigger .menu-close {
            display: block !important;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
  
        #memu-r7c0m2:checked ~ .menu-links {
          background-color: #000 !important;
        }
  
        #memu-r7c0m2:checked ~ .menu-links a,
        #memu-r7c0m2:checked ~ .menu-links span {
          color: #fff !important;
        }
      </style>
    </head>
  
    <body style="background-color: #fff0e3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff0e3">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 30px; line-height: 30px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-2" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-3" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <h2 style="color: #000; font-size: 24px; line-height: 1.2; font-weight: 600; margin: 0 0 15px 0; text-align: center">${title}</h2>
                              <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; text-align: center">${message}</p>
                              <div class="spacer_block block-2" style="height: 20px; line-height: 20px; font-size: 1px">&#8202;</div>
                              <table class="btn" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-weight: 700; padding: 12px 24px; background-color: #000; border-radius: 4px">
                                      <a href="${link}" style="color: #fff; text-decoration: none; display: inline-block; font-size: 16px; line-height: 1.6; font-weight: 700">${btnTitle}</a>
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
    </body>
  </html>`;
};
module.exports = generateTemplate;
*/
const generateTemplate = (options) => {
  const { title, message, link, btnTitle } = options;

  return `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        .menu_block.desktop_hide .menu-links span {
          mso-hide: all;
        }
  
        @media (max-width: 700px) {
          .desktop_hide table.icons-inner,
          .social_block.desktop_hide .social-table {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .image_block img.fullWidth {
            max-width: 100% !important;
          }
  
          .menu-checkbox[type="checkbox"] ~ .menu-links {
            display: none !important;
            padding: 5px 0;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-trigger .menu-open {
            display: none !important;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-links,
          .menu-checkbox[type="checkbox"] ~ .menu-trigger {
            display: block !important;
            max-width: none !important;
            max-height: none !important;
            font-size: inherit !important;
          }
  
          .menu-checkbox[type="checkbox"] ~ .menu-links > a,
          .menu-checkbox[type="checkbox"] ~ .menu-links > span.label {
            display: block !important;
            text-align: center;
          }
  
          .menu-checkbox[type="checkbox"]:checked ~ .menu-trigger .menu-close {
            display: block !important;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
  
        #memu-r7c0m2:checked ~ .menu-links {
          background-color: #000 !important;
        }
  
        #memu-r7c0m2:checked ~ .menu-links a,
        #memu-r7c0m2:checked ~ .menu-links span {
          color: #fff !important;
        }
      </style>
    </head>
  
    <body style="background-color: #fff0e3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff0e3">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 30px; line-height: 30px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="width: 100%; padding-right: 0px; padding-left: 0px">
                                    <div class="alignment" align="center" style="line-height: 10px">
                                      <a href="https://fotoidol.com/" target="_blank" rel="noopener noreferrer">
                                      <img src="https://fotoidol.com/assets/site_logo-8fe97392.png" style="display: block; height: auto; border: 0; max-width: 100px; width: 100%" width="100" alt="Company Logo" title="Company Logo" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 10px; line-height: 10px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="width: 100%">
                                    <div class="alignment" align="center" style="line-height: 10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/round_corner_top.png" style="display: block; height: auto; border: 0; max-width: 680px; width: 100%" width="680" alt="Top round corners" title="Top round corners" /></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-2" style="height: 35px; line-height: 35px; font-size: 1px">&#8202;</div>
                              <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="text-align: center; width: 100%">
                                    <h1 style="margin: 0; color: #101010; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0"><strong> ${title}</strong></h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word">
                                <tr>
                                  <td class="pad" style="padding-bottom: 10px; padding-left: 20px; padding-right: 10px; padding-top: 10px">
                                    <div style="color: #848484; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 14px; line-height: 180%; text-align: center; mso-line-height-alt: 25.2px">
                                      <p style="margin: 0; word-break: break-word"><span> ${message}</span></p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <div class="spacer_block block-2" style="height: 10px; line-height: 10px; font-size: 1px">&#8202;</div>
                              <table class="button_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <a
                                        href=${link}
                                        target="_blank"
                                        style="text-decoration: none; display: inline-block; color: #ffffff; background-color: #101; border-radius: 4px; width: auto; border-top: 1px solid #101; font-weight: undefined; border-right: 1px solid #101; border-bottom: 1px solid #101; border-left: 1px solid #101; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 16px; text-align: center; mso-border-alt: none; word-break: keep-all; user-select: all;">
                                          <span style="padding-left: 20px; padding-right: 20px; font-size: 16px; display: inline-block; letter-spacing: normal"><span style="word-break: break-word; line-height: 32px"> ${btnTitle}</span></span></a>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <div class="spacer_block block-4" style="height: 20px; line-height: 20px; font-size: 1px">&#8202;</div>
                            </td>
                            <td class="column column-3" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 0px; line-height: 0px; font-size: 1px">&#8202;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="width: 100%">
                                    <div class="alignment" align="center" style="line-height: 10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/round_corner_bottom.png" style="display: block; height: auto; border: 0; max-width: 679px; width: 100%" width="679" alt="Bottom round corners" title="Bottom round corners" /></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 680px; margin: 0 auto" width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px">
                              <div class="spacer_block block-1" style="height: 20px; line-height: 20px; font-size: 1px">&#8202;</div>
                              <table class="social_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                                <tr>
                                  <td class="pad" style="padding-bottom: 15px; padding-left: 10px; padding-right: 10px; padding-top: 10px; text-align: center">
                                    <div class="alignment" align="center">
                                        <table class="social-table" width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block">
                                            <td style="font-family: 'Inter', sans-serif; font-size: 15px; color: black; text-align: center">
                                                <strong>FotoIdol:</strong> Capture Your Moments, Become A Foto Idol.
                                            </td>
                                        </table>
                                    </div>
                                 </td>
                                </tr>
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
    </body>
  </html>
  `;
};

module.exports = generateTemplate;




