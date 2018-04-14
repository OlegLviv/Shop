using System.Collections.Generic;
using System.Linq;

namespace Common.Extensions
{
    public static class LinqExtension
    {
        //
        // Summary:
        //     Produces the set intersection of two sequences by using the default equality
        //     comparer to compare values.
        //
        // Parameters:
        //   first:
        //     An System.Collections.Generic.IEnumerable`1 whose distinct elements that also
        //     appear in second will be returned.
        //
        //   second:
        //     An T value who distinct elements that also
        //     appear in the first sequence will be returned.
        //
        // Type parameters:
        //   TSource:
        //     The type of the elements of the input sequences.
        //
        // Returns:
        //     A sequence that contains the elements that form the set intersection of two sequences.
        //
        // Exceptions:
        //   T:System.ArgumentNullException:
        //     first or second is null.
        public static IEnumerable<T> Intersect<T>(this IEnumerable<T> first, T second)
        {
            return first.Intersect(new[] { second });
        }
    }
}
