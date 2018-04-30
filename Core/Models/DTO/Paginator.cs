﻿using System.Collections.Generic;

namespace Core.Models.DTO
{
    public class Paginator<TData>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public IEnumerable<TData> Data { get; set; }
    }
}
