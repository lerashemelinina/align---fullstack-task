using DataModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Process;
using System.Collections.Generic;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;

        public ImagesController(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        [HttpGet]
        [EnableCors("AppPolicy")]
        public List<ImgModel> GetImages(int num = 5)
        {
            List<ImgModel> res = null;

            res = new ImagesProcess(_memoryCache).GetImages(num);

            return res;
        }
    }
}
