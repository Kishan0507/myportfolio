from django.contrib import admin
from .models import Profile, Achievement, Contribution


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'email', 'github_username')


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'icon', 'order')
    list_editable = ('order',)


@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'order')
    list_editable = ('order',)
