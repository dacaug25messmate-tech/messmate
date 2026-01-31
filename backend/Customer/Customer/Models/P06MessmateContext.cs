using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Customer.Models;

public partial class P06MessmateContext : DbContext
{
    public P06MessmateContext()
    {
    }

    public P06MessmateContext(DbContextOptions<P06MessmateContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<CustomerVisitLog> CustomerVisitLogs { get; set; }

    public virtual DbSet<FoodItem> FoodItems { get; set; }

    public virtual DbSet<FoodItemRequest> FoodItemRequests { get; set; }

    public virtual DbSet<MealMenu> MealMenus { get; set; }

    public virtual DbSet<MealmenuFooditem> MealmenuFooditems { get; set; }

    public virtual DbSet<Mess> Messes { get; set; }

    public virtual DbSet<MessPhoto> MessPhotos { get; set; }

    public virtual DbSet<MonthlyPlan> MonthlyPlans { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SecurityQuestion> SecurityQuestions { get; set; }

    public virtual DbSet<SubCategory> SubCategories { get; set; }

    public virtual DbSet<Subscription> Subscriptions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p06_messmate", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.42-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.AreaId).HasName("PRIMARY");

            entity.ToTable("area");

            entity.HasIndex(e => e.AreaId, "area_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.CityId, "city_id_idx");

            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.AreaName)
                .HasMaxLength(255)
                .HasColumnName("area_name");
            entity.Property(e => e.CityId).HasColumnName("city_id");

            entity.HasOne(d => d.City).WithMany(p => p.Areas)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("city_id");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PRIMARY");

            entity.ToTable("category");

            entity.HasIndex(e => e.CategoryId, "category_id_UNIQUE").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(255)
                .HasColumnName("category_name");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.CityId).HasName("PRIMARY");

            entity.ToTable("city");

            entity.HasIndex(e => e.CityId, "city_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.CityName, "city_name_UNIQUE").IsUnique();

            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CityName).HasColumnName("city_name");
        });

        modelBuilder.Entity<CustomerVisitLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PRIMARY");

            entity.ToTable("customer_visit_log");

            entity.HasIndex(e => e.LogId, "log_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.SubscriptionId, "subscription_id_idx");

            entity.Property(e => e.LogId).HasColumnName("log_id");
            entity.Property(e => e.MealType)
                .HasColumnType("enum('Lunch','Dinner')")
                .HasColumnName("meal_type");
            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.VisitDate).HasColumnName("visit_date");
            entity.Property(e => e.VisitStatus)
                .HasDefaultValueSql("'Unvisited'")
                .HasColumnType("enum('Visited','Unvisited')")
                .HasColumnName("visit_status");

            entity.HasOne(d => d.Subscription).WithMany(p => p.CustomerVisitLogs)
                .HasForeignKey(d => d.SubscriptionId)
                .HasConstraintName("log_subscription_id");
        });

        modelBuilder.Entity<FoodItem>(entity =>
        {
            entity.HasKey(e => e.FoodItemId).HasName("PRIMARY");

            entity.ToTable("food_item");

            entity.HasIndex(e => e.FoodItemId, "food_item_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.FoodName, "food_name_UNIQUE").IsUnique();

            entity.HasIndex(e => e.SubCategoryId, "sub_category_id_idx");

            entity.Property(e => e.FoodItemId).HasColumnName("food_item_id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.FoodName).HasColumnName("food_name");
            entity.Property(e => e.SubCategoryId).HasColumnName("sub_category_id");

            entity.HasOne(d => d.SubCategory).WithMany(p => p.FoodItems)
                .HasForeignKey(d => d.SubCategoryId)
                .HasConstraintName("fooditem_sub_category_id");
        });

        modelBuilder.Entity<FoodItemRequest>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PRIMARY");

            entity.ToTable("food_item_request");

            entity.HasIndex(e => e.MessId, "mess_id_idx");

            entity.HasIndex(e => e.RequestId, "request_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.SubCategoryId, "sub_category_id_idx");

            entity.Property(e => e.RequestId).HasColumnName("request_id");
            entity.Property(e => e.ItemDescription)
                .HasMaxLength(255)
                .HasColumnName("item_description");
            entity.Property(e => e.ItemName)
                .HasMaxLength(45)
                .HasColumnName("item_name");
            entity.Property(e => e.MessId).HasColumnName("mess_id");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'PENDING'")
                .HasColumnType("enum('PENDING','APPROVED','REJECTED')")
                .HasColumnName("status");
            entity.Property(e => e.SubCategoryId).HasColumnName("sub_category_id");

            entity.HasOne(d => d.Mess).WithMany(p => p.FoodItemRequests)
                .HasForeignKey(d => d.MessId)
                .HasConstraintName("request_mess_id");

            entity.HasOne(d => d.SubCategory).WithMany(p => p.FoodItemRequests)
                .HasForeignKey(d => d.SubCategoryId)
                .HasConstraintName("request_sub_category_id");
        });

        modelBuilder.Entity<MealMenu>(entity =>
        {
            entity.HasKey(e => e.MenuId).HasName("PRIMARY");

            entity.ToTable("meal_menu");

            entity.HasIndex(e => e.MenuId, "menu_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.MessId, "mess_id_idx");

            entity.Property(e => e.MenuId).HasColumnName("menu_id");
            entity.Property(e => e.MenuDate).HasColumnName("menu_date");
            entity.Property(e => e.MenuType)
                .HasMaxLength(255)
                .HasColumnName("menu_type");
            entity.Property(e => e.MessId).HasColumnName("mess_id");

            entity.HasOne(d => d.Mess).WithMany(p => p.MealMenus)
                .HasForeignKey(d => d.MessId)
                .HasConstraintName("meal_mess_id");
        });

        modelBuilder.Entity<MealmenuFooditem>(entity =>
        {
            entity.HasKey(e => e.MealmenuFooditemId).HasName("PRIMARY");

            entity.ToTable("mealmenu_fooditem");

            entity.HasIndex(e => e.FoodId, "food_id_idx");

            entity.HasIndex(e => e.MealmenuFooditemId, "mealmenu_fooditem_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.MenuId, "menu_id_idx");

            entity.Property(e => e.MealmenuFooditemId).HasColumnName("mealmenu_fooditem_id");
            entity.Property(e => e.FoodId).HasColumnName("food_id");
            entity.Property(e => e.MenuId).HasColumnName("menu_id");

            entity.HasOne(d => d.Food).WithMany(p => p.MealmenuFooditems)
                .HasForeignKey(d => d.FoodId)
                .HasConstraintName("mealmenu_food_id");

            entity.HasOne(d => d.Menu).WithMany(p => p.MealmenuFooditems)
                .HasForeignKey(d => d.MenuId)
                .HasConstraintName("mealmenu_menu_id");
        });

        modelBuilder.Entity<Mess>(entity =>
        {
            entity.HasKey(e => e.MessId).HasName("PRIMARY");

            entity.ToTable("mess");

            entity.HasIndex(e => e.AreaId, "area_id_idx");

            entity.HasIndex(e => e.UserId, "user_id_idx");

            entity.Property(e => e.MessId).HasColumnName("mess_id");
            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.DinnerCloseTime)
                .HasColumnType("time")
                .HasColumnName("dinner_close_time");
            entity.Property(e => e.DinnerOpenTime)
                .HasColumnType("time")
                .HasColumnName("dinner_open_time");
            entity.Property(e => e.LunchCloseTime)
                .HasColumnType("time")
                .HasColumnName("lunch_close_time");
            entity.Property(e => e.LunchOpenTime)
                .HasColumnType("time")
                .HasColumnName("lunch_open_time");
            entity.Property(e => e.MessAddress)
                .HasMaxLength(255)
                .HasColumnName("mess_address");
            entity.Property(e => e.MessName)
                .HasMaxLength(255)
                .HasColumnName("mess_name");
            entity.Property(e => e.MessType)
                .HasMaxLength(255)
                .HasColumnName("mess_type");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Area).WithMany(p => p.Messes)
                .HasForeignKey(d => d.AreaId)
                .HasConstraintName("area_id");

            entity.HasOne(d => d.User).WithMany(p => p.Messes)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_id");
        });

        modelBuilder.Entity<MessPhoto>(entity =>
        {
            entity.HasKey(e => e.PhotoId).HasName("PRIMARY");

            entity.ToTable("mess_photo");

            entity.HasIndex(e => e.MessId, "mess_id_idx");

            entity.HasIndex(e => e.PhotoId, "photo_id_UNIQUE").IsUnique();

            entity.Property(e => e.PhotoId).HasColumnName("photo_id");
            entity.Property(e => e.MessId).HasColumnName("mess_id");
            entity.Property(e => e.PhotoUrl)
                .HasMaxLength(255)
                .HasColumnName("photo_url");

            entity.HasOne(d => d.Mess).WithMany(p => p.Photos)
                .HasForeignKey(d => d.MessId)
                .HasConstraintName("photo_mess_id");
        });

        modelBuilder.Entity<MonthlyPlan>(entity =>
        {
            entity.HasKey(e => e.PlanId).HasName("PRIMARY");

            entity.ToTable("monthly_plan");

            entity.HasIndex(e => e.MessId, "mess_id_idx");

            entity.HasIndex(e => e.PlanId, "plan_id_UNIQUE").IsUnique();

            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.MealInclusion)
                .HasColumnType("enum('Lunch','Dinner','Both')")
                .HasColumnName("meal_inclusion");
            entity.Property(e => e.MessId).HasColumnName("mess_id");
            entity.Property(e => e.MonthlyPrice)
                .HasPrecision(10, 2)
                .HasColumnName("monthly_price");
            entity.Property(e => e.PlanName)
                .HasMaxLength(45)
                .HasColumnName("plan_name");
            entity.Property(e => e.ValidityPeriod).HasColumnName("validity_period");

            entity.HasOne(d => d.Mess).WithMany(p => p.MonthlyPlans)
                .HasForeignKey(d => d.MessId)
                .HasConstraintName("plan_mess_id");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.RatingId).HasName("PRIMARY");

            entity.ToTable("ratings");

            entity.HasIndex(e => e.MessId, "mess_id_idx");

            entity.HasIndex(e => e.RatingId, "rating_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.UserId, "user_id_idx");

            entity.Property(e => e.RatingId).HasColumnName("rating_id");
            entity.Property(e => e.Comments)
                .HasMaxLength(255)
                .HasColumnName("comments");
            entity.Property(e => e.MessId).HasColumnName("mess_id");
            entity.Property(e => e.Rating1).HasColumnName("rating");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Mess).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.MessId)
                .HasConstraintName("ratings_mess_id");

            entity.HasOne(d => d.User).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("ratings_user_id");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.ToTable("role");

            entity.HasIndex(e => e.RoleId, "role_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.RoleName, "role_name_UNIQUE").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName).HasColumnName("role_name");
        });

        modelBuilder.Entity<SecurityQuestion>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PRIMARY");

            entity.ToTable("security_question");

            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.QuestionText)
                .HasMaxLength(255)
                .HasColumnName("question_text");
        });

        modelBuilder.Entity<SubCategory>(entity =>
        {
            entity.HasKey(e => e.SubCategoryId).HasName("PRIMARY");

            entity.ToTable("sub_category");

            entity.HasIndex(e => e.CategoryId, "category_id_idx");

            entity.HasIndex(e => e.SubCategoryId, "sub_category_id_UNIQUE").IsUnique();

            entity.Property(e => e.SubCategoryId).HasColumnName("sub_category_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.SubCategoryName)
                .HasMaxLength(255)
                .HasColumnName("sub_category_name");

            entity.HasOne(d => d.Category).WithMany(p => p.SubCategories)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("category_id");
        });

        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.HasKey(e => e.SubscriptionId).HasName("PRIMARY");

            entity.ToTable("subscription");

            entity.HasIndex(e => e.PlanId, "plan_id_idx");

            entity.HasIndex(e => e.SubscriptionId, "subscription_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.UserId, "user_id_idx");

            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Status)
                .HasColumnType("enum('Active','Expired','Cancel')")
                .HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Plan).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.PlanId)
                .HasConstraintName("subscription_plan_id");

            entity.HasOne(d => d.User).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("subscription_user_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.AreaId, "area_id_idx");

            entity.HasIndex(e => e.Password, "password_UNIQUE").IsUnique();

            entity.HasIndex(e => e.QuestionId, "question_id_idx");

            entity.HasIndex(e => e.RoleId, "role_id_idx");

            entity.HasIndex(e => e.UserName, "user_name_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Userid, "userid_UNIQUE").IsUnique();

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.QuestionAnswer)
                .HasMaxLength(255)
                .HasColumnName("question_answer");
            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.UserName).HasColumnName("user_name");

            entity.HasOne(d => d.Area).WithMany(p => p.Users)
                .HasForeignKey(d => d.AreaId)
                .HasConstraintName("user_area_id");

            entity.HasOne(d => d.Question).WithMany(p => p.Users)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("question_id");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("role_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
