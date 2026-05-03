from django.urls import path
from .views import ProfileView, AchievementListView, ContributionListView, GitHubReposView

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('achievements/', AchievementListView.as_view(), name='achievements'),
    path('contributions/', ContributionListView.as_view(), name='contributions'),
    path('github-repos/', GitHubReposView.as_view(), name='github-repos'),
]
