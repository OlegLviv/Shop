using System.Collections.Generic;
using System.Linq;

namespace Common.Extensions
{
    public static class PaginationExtension
    {
        public static IQueryable<TSource> Page<TSource>(this IQueryable<TSource> source, int page, int pageSize) => source.Skip((page - 1) * pageSize).Take(pageSize);

        public static IEnumerable<TSource> Page<TSource>(this IEnumerable<TSource> source, int page, int pageSize) => source.Skip((page - 1) * pageSize).Take(pageSize);
    }
}
