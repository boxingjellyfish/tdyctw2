using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(tdyctw.Startup))]
namespace tdyctw
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
