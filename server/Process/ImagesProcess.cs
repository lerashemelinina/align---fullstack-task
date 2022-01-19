using DataAccess;
using DataModel;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;

namespace Process
{
    public class ImagesProcess
    {
        private readonly IMemoryCache _memoryCache;

        string imgKey = "images";

        public ImagesProcess(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public List<ImgModel> GetImages(int num)
        {
            List<ImgModel> res = null;

            CacheObjModel cacheData;

            if (!_memoryCache.TryGetValue(imgKey, out cacheData))
            {
                List<ImgModel> data = new ImagesDataAccess().GetImages(1);

                if (data != null)
                {
                    cacheData = new CacheObjModel { items = data, page = 1 };

                    _memoryCache.Set(imgKey, cacheData);
                }
            }

            if (cacheData != null && cacheData.items.Count < num)
            {
                if (cacheData.page == 10)
                {
                    cacheData.page = 0;
                }

                List<ImgModel> data = new ImagesDataAccess().GetImages(++cacheData.page);

                if (data != null)
                {
                    cacheData.items.AddRange(data);
                }

            }

            if (cacheData != null)
            {
                if (cacheData.items.Count > num)
                {
                    res = createRandomList(num, cacheData.items);
                }
                else
                {
                    res = cacheData.items;

                    cacheData.items.Clear();
                }

            }

            return res;
        }

        private List<ImgModel> createRandomList(int num, List<ImgModel> items)
        {
            var rand = new Random();

            List<ImgModel> res = new List<ImgModel>();

            for (int i = 0; i < num; i++)
            {
                int index = rand.Next(0, items.Count - 1);

                res.Add(items[index]);

                items.RemoveAt(index);
            }

            return res;
        }
    }
}
