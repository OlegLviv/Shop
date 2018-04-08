using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace DAL.Initializator
{
    public static class PropsInitializator
    {
        public static async Task InitializeAsync(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (await context.ProductProperties.AnyAsync() || await context.PossibleProductProperties.AnyAsync())
            {
                return; // DB has been seeded
            }

            await InitPropsAsync(context);
            await InitPossiblePPAsync(context);
        }

        private static async Task<int> InitPropsAsync(AppDbContext context)
        {
            var prodProps = new List<ProductProperty>
            {
                new ProductProperty
                {
                    SubCategory = "schoolFolders",
                    Properties = "Призначення;Колір"
                },
                new ProductProperty
                {
                    SubCategory = "officeFolders",
                    Properties = "Тип;Колір"
                },
                new ProductProperty
                {
                    SubCategory = "copyBooks",
                    Properties = "Формат;Колір;К-сть листів;Виробник;Лініювання"
                },
                new ProductProperty
                {
                    SubCategory = "notebooks",
                    Properties = "К-сть листів;Колір;Виробник"
                },
                new ProductProperty
                {
                    SubCategory = "stickers",
                    Properties = "Колір"
                },
                new ProductProperty
                {
                    SubCategory = "dictionaries",
                    Properties = "Колір"
                },
                new ProductProperty
                {
                    SubCategory = "pens",
                    Properties = "Колір;Виробник;Тип;Товщина лінії"
                },
                new ProductProperty
                {
                    SubCategory = "pencils",
                    Properties = "Вид;Твердість грифиля;Виробник;Діаметр грифиля;Виробник"
                },
                new ProductProperty
                {
                    SubCategory = "markers",
                    Properties = "Виробник;Колір;Товщина лінії"
                },
                new ProductProperty
                {
                    SubCategory = "proofreaders",
                    Properties = "Тип;Виробник"
                },
                new ProductProperty
                {
                    SubCategory = "schoolSupplies",
                    Properties = ""
                },
                new ProductProperty
                {
                    SubCategory = "officeSupplies",
                    Properties = ""
                },
                new ProductProperty
                {
                    SubCategory = "zno",
                    Properties = ""
                },


                new ProductProperty
                {
                    SubCategory = "casket",
                    Properties = ";"
                },
                new ProductProperty
                {
                    SubCategory = "decorativeBoxes",
                    Properties = ""
                },
                new ProductProperty
                {
                    SubCategory = "figures",
                    Properties = ""
                },
            };
            await context.AddRangeAsync(prodProps);
            return await context.SaveChangesAsync();
        }

        private static async Task<int> InitPossiblePPAsync(AppDbContext context)
        {
            var ppp = new List<PossibleProductProperty>
            {
                new PossibleProductProperty
                {
                     SubCategory = "schoolFolders",
                    PropertyName = "Призначення",
                    Values = "Для зошитів;Для праці",
                },
                new PossibleProductProperty
                {
                    SubCategory = "schoolFolders",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій",
                },
                new PossibleProductProperty
                {
                    SubCategory = "officeFolders",
                    PropertyName = "Тип",
                    Values = "З файлами;Папки-реєстратори",
                },
                new PossibleProductProperty
                {
                    SubCategory = "officeFolders",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій",
                },
                new PossibleProductProperty
                {
                    SubCategory = "copyBooks",
                    PropertyName = "Формат",
                    Values = "A5;B5",
                },
                new PossibleProductProperty
                {
                    SubCategory = "copyBooks",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій",
                },
                new PossibleProductProperty
                {
                    SubCategory = "copyBooks",
                    PropertyName = "К-сть листів",
                    Values = "12;18;24;36;48;60;80;96;192",
                },
                new PossibleProductProperty
                {
                    SubCategory = "copyBooks",
                    PropertyName = "Виробник",
                    Values = "1 Вересня;Тетрада",
                },
                new PossibleProductProperty
                {
                    SubCategory = "copyBooks",
                    PropertyName = "Лініювання",
                    Values = "Клітинка;Лінія;Коса лінія",
                },
                new PossibleProductProperty
                {
                    SubCategory = "notebooks",
                    PropertyName = "К-сть листів",
                    Values = "12;18;24;36;48;60;80;96;192",
                },
                new PossibleProductProperty
                {
                    SubCategory = "notebooks",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій",
                },
                new PossibleProductProperty
                {
                    SubCategory = "notebooks",
                    PropertyName = "Виробник",
                    Values = "1 Вересня;Тетрада",
                },
                new PossibleProductProperty
                {
                    SubCategory = "stickers",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій",
                },
                new PossibleProductProperty
                {
                    SubCategory = "dictionaries",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pens",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pens",
                    PropertyName = "Виробник",
                    Values = "BIC;Disney",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pens",
                    PropertyName = "Тип",
                    Values = "Гелеві;Дитячі;Кулькові;Масляні",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pens",
                    PropertyName = "Товщина лінії",
                    Values = "0.3;0.25;0.35",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pencils",
                    PropertyName = "Товщина лінії",
                    Values = "0.3;0.25;0.35",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pencils",
                    PropertyName = "Вид",
                    Values = "Олівець;Олівець+гумка;Олівецт-ручка",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pencils",
                    PropertyName = "Твердість грифиля",
                    Values = "2B;2H-3B;3H-6B;B;H;H-2B;H-B;HB",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pencils",
                    PropertyName = "Діаметр грифиля",
                    Values = "0.5;0.7;2;5.6",
                },
                new PossibleProductProperty
                {
                    SubCategory = "pencils",
                    PropertyName = "Виробник",
                    Values = "BIC;Pilot",
                },
                new PossibleProductProperty
                {
                    SubCategory = "markers",
                    PropertyName = "Виробник",
                    Values = "BIC;Pilot",
                },
                new PossibleProductProperty
                {
                    SubCategory = "markers",
                    PropertyName = "Колір",
                    Values = "Червоний;Синій;Чорний",
                },
                new PossibleProductProperty
                {
                    SubCategory = "markers",
                    PropertyName = "Товщина лінії",
                    Values = "0.1;0.1;0.3;0.5;0.6;0.8;1;1-2",
                },
                new PossibleProductProperty
                {
                    SubCategory = "proofreaders",
                    PropertyName = "Тип",
                    Values = "Рідкий;Стрічковий",
                },
                new PossibleProductProperty
                {
                    SubCategory = "proofreaders",
                    PropertyName = "Виробник",
                    Values = "BIC;Optima",
                }

            };
            await context.AddRangeAsync(ppp);
            return await context.SaveChangesAsync();
        }
    }
}
