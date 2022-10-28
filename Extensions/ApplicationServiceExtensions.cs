using API.Data;
using API.interfaces;
using API.services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    //static - there's no need to create a new instance of this class in order to use it
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //It is scoped to the lifetime of the HTTP request, when the request is finished, service instance is disposed.
            services.AddScoped<ITokenService, TokenService>(); 

            services.AddDbContext<DataContext>(options => {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}