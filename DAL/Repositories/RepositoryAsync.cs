using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.DomainModels.Base;

namespace DAL.Repositories
{
    public class RepositoryAsync<TEntity> : IRepositoryAsync<TEntity> where TEntity : class, IBaseEntity
    {
        private readonly AppDbContext _context;
        private DbSet<TEntity> _entities;

        public RepositoryAsync(AppDbContext context)
        {
            _context = context;
        }

        protected virtual DbSet<TEntity> Entities
        {
            get
            {
                if (_entities == null)
                {
                    this._entities = _context.Set<TEntity>();
                }
                return _entities;
            }
        }

        public IQueryable<TEntity> Table => this.Entities;

        public virtual async Task<TEntity> GetByIdAsync(string id)
        {
            return await this.Entities.FindAsync(id);
        }

        public virtual async Task<int> InsertAsync(IEnumerable<TEntity> entities)
        {
            try
            {
                entities.ToList().ForEach(async entity => await this.Entities.AddAsync(entity));
                return await this._context.SaveChangesAsync();
            }
            catch (Exception er)
            {
                Debug.WriteLine(er.Message);
                return -1;
            }
        }

        public virtual async Task<int> UpdateAsync(IEnumerable<TEntity> entities)
        {
            try
            {
                // Can add Parallel.ForEach
                foreach (var entity in entities)
                {
                    _context.Entry(entity).State = EntityState.Modified;
                }
                return await _context.SaveChangesAsync();
            }
            catch (Exception er)
            {
                Debug.Write(er.Message);
                return -1;
            }
        }

        public virtual async Task<int> DeleteAsync(IEnumerable<TEntity> entities)
        {
            try
            {
                // todo maybe make sense to add Parallel.ForEach
                foreach (var entity in entities)
                {
                    _context.Entry(entity).State = EntityState.Deleted;
                }
                return await _context.SaveChangesAsync();
            }
            catch (Exception er)
            {
                Debug.Write(er.Message);
                return -1;
            }
        }

        public async Task<int> InsertAsync(TEntity entity)
        {
            return await InsertAsync(new List<TEntity>() { entity });
        }

        public async Task<int> UpdateAsync(TEntity entity)
        {
            return await UpdateAsync(new List<TEntity>() { entity });
        }

        public async Task<int> DeleteAsync(TEntity entity)
        {
            return await DeleteAsync(new List<TEntity>() { entity });
        }
    }
}
