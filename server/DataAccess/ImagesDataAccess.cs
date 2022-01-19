using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class ImagesDataAccess
    {
        public List<ImgModel> GetImages(int page)
        {
            List<ImgModel> res = null;

            var client = new HttpClient();

            string url = "https://picsum.photos/v2/list?page=" + page + "&limit=100";

            client.GetAsync(url).ContinueWith((task) =>
            {
                if (task.Exception == null)
                {
                    HttpResponseMessage response = task.Result;

                    if (response.IsSuccessStatusCode)
                    {
                        response.Content.ReadAsAsync<List<ImgModel>>().ContinueWith((readTask) =>
                        {
                            res = readTask.Result;

                            return res;

                        });
                    }
                }

            }).Wait();

            return res;
        }
    }
}
