using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.Owin.Security.Notifications;
//using System;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Logging;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography.X509Certificates;

namespace SimplrSales
{
    public class Startup
    {
        // The Client ID (a.k.a. Application ID) is used by the application to uniquely identify itself to Azure AD
        string clientId = System.Configuration.ConfigurationManager.AppSettings["ClientId"];

        // RedirectUri is the URL where the user will be redirected to after they sign in
        string redirectUrl = System.Configuration.ConfigurationManager.AppSettings["redirectUrl"];

        // Tenant is the tenant ID (e.g. contoso.onmicrosoft.com, or 'common' for multi-tenant)
        static string tenant = System.Configuration.ConfigurationManager.AppSettings["Tenant"];

        // Authority is the URL for authority, composed by Azure Active Directory endpoint and the tenant name (e.g. https://login.microsoftonline.com/contoso.onmicrosoft.com)
        string authority = String.Format(System.Globalization.CultureInfo.InvariantCulture, System.Configuration.ConfigurationManager.AppSettings["Authority"], tenant);

        /// <summary>
        /// Configure OWIN to use OpenIdConnect 
        /// </summary>
        /// <param name="app"></param>
        public void Configuration(IAppBuilder app)
        {
            Controllers.BusinessRule.ErrorLogString("Startup.cs Configuration");

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
            app.MapSignalR();
            // app.UseCookieAuthentication(new CookieAuthenticationOptions());
            //            app.UseKentorOwinCookieSaver(); //if not already there, before
            //app.UseCookieAuthentication(cookieOptions);

            //app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);
            //app.UseKentorOwinCookieSaver();
            app.UseCookieAuthentication(new CookieAuthenticationOptions());


            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    //AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
            //  //  LoginPath = new PathString("/admin/account/login"),
            //    AuthenticationType = "ApplicationCookie",
            //    CookieSecure = CookieSecureOption.Never
            //});
            Controllers.BusinessRule.ErrorLogString("ClientId : " + clientId);
            Controllers.BusinessRule.ErrorLogString("authority : " + authority);
            Controllers.BusinessRule.ErrorLogString("redirectUrl : " + redirectUrl);

            IdentityModelEventSource.ShowPII = true;

            app.UseOpenIdConnectAuthentication(
                new OpenIdConnectAuthenticationOptions
                {

                    // Sets the ClientId, authority, RedirectUri as obtained from web.config
                    ClientId = clientId,
                    Authority = authority,
                    RedirectUri = redirectUrl,

                    // PostLogoutRedirectUri is the page that users will be redirected to after sign-out. In this case, it is using the home page
                    PostLogoutRedirectUri = redirectUrl,

                    //Scope is the requested scope: OpenIdConnectScopes.OpenIdProfileis equivalent to the string 'openid profile': in the consent screen, this will result in 'Sign you in and read your profile'
                    Scope = OpenIdConnectScope.OpenIdProfile,

                    //MetadataAddress = "https://login.microsoftonline.com/66984d9a-b5aa-41d9-9cf6-12cbc4d18e7b/.well-known/openid-configuration?appid=041a7870-996e-4dd4-b9c4-7387db06c6c1",
                    // ResponseType is set to request the id_token - which contains basic information about the signed-in user
                     ResponseType = OpenIdConnectResponseType.CodeIdToken,
                   // ResponseType = OpenIdConnectResponseType.Code,

                    // ValidateIssuer set to false to allow work accounts from any organization to sign in to your application
                    // To only allow users from a single organizations, set ValidateIssuer to true and 'tenant' setting in web.config to the tenant name or Id (example: contoso.onmicrosoft.com)
                    // To allow users from only a list of specific organizations, set ValidateIssuer to true and use ValidIssuers parameter
                    TokenValidationParameters = new TokenValidationParameters()
                    {
                    //    // ValidateIssuerSigningKey = false,
                         ValidateIssuer = false
                    //    ValidateIssuer = false,
                    //    //ValidIssuer = ValidIssuer,

                    //    ValidateAudience = false,
                    //    //ValidAudience = ValidAudience,
                    //    ValidateTokenReplay = false,

                    //    ValidateIssuerSigningKey = false

                    //    //IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey)),
                    //    //comment this and add this line to fool the validation logic
                    //    //SignatureValidator = delegate (string token, TokenValidationParameters parameters)
                    //    //{
                    //    //    var jwt = new JwtSecurityToken(token);

                    //    //    return jwt;
                    //    //},

                    //   // RequireExpirationTime = true,
                    //   // ValidateLifetime = true,

                    //    //ClockSkew = TimeSpan.Zero
                    },

                    // OpenIdConnectAuthenticationNotifications configures OWIN to send notification of failed authentications to OnAuthenticationFailed method
                    Notifications = new OpenIdConnectAuthenticationNotifications
                    {
                        AuthenticationFailed = OnAuthenticationFailed
                    }
                }
            );
        }

        /// <summary>
        /// Handle failed authentication requests by redirecting the user to the home page with an error in the query string
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private Task OnAuthenticationFailed(AuthenticationFailedNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> context)
        {
            Controllers.BusinessRule.ErrorLog(context.Exception);
           Controllers.BusinessRule.ErrorLogString1("/?errormessage=" + context.Exception.Message);
            Controllers.BusinessRule.ErrorLogString1("/?Request.User.Identity.Name=" + context.Request.User.Identity.Name);
           context.HandleResponse();
            context.Response.Redirect("/?errormessage=" + context.Exception.Message);
            //Controllers.BusinessRule.ErrorLog(context.Exception);
            //Controllers.BusinessRule.ErrorLogString1("/?errormessage=" + context.Exception.Message);
            //Controllers.BusinessRule.ErrorLogString1("/?Request.User.Identity.Name=" + context.Request.User.Identity.Name);
            return Task.FromResult(0);
        }
    }
}