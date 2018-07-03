using System.Text;

namespace Core.Models.DTO
{
    public static class MailsContainer
    {
        public static string GetMailForCreateOrder(DomainModels.Order order)
        {
            var mail = $@"
                         {order.Name} {order.LastName}, ваше замовлення було успішно оформлено!
                          Наш менеджер скоро зв'яжеться з вами.
                          Номер замовлення: {order.Id} 
                          Ви замовили:
                          {GetOrdersString(order)}
                          Сума замовлення: {order.TotalPrice}
                          Спосіб доставки: {order.WayOfDelivery}
                          Ваш контактний номер: {order.PhoneNumber}";

            return mail;
        }

        private static string GetOrdersString(DomainModels.Order order)
        {
            var productsContainer = order.ProductsContainers;
            var ordersString = new StringBuilder();

            foreach (var productOrderContainer in productsContainer)
            {
                var price = productOrderContainer.Product.Discount > 0 ? productOrderContainer.Product.PriceWithDiscount : productOrderContainer.Product.Price;

                ordersString.Append(
                    $"{productOrderContainer.Product.Name}, {productOrderContainer.Count} * {price} = {price * productOrderContainer.Count}грн\n");
            }

            return ordersString.ToString();
        }
    }
}
