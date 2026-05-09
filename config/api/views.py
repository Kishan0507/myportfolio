import requests as http_requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Profile, Achievement, Contribution
from .serializers import ProfileSerializer, AchievementSerializer, ContributionSerializer


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({'detail': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class AchievementListView(APIView):
    def get(self, request):
        achievements = Achievement.objects.all()
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data)


class ContributionListView(APIView):
    
    def get(self, request):
        contributions = Contribution.objects.all()
        serializer = ContributionSerializer(contributions, many=True)
        return Response(serializer.data)


class GitHubReposView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        username = profile.github_username if profile else 'Kishan0507'

        try:
            headers = {'User-Agent': 'Kishan0507-Portfolio-App'}
            resp = http_requests.get(
                f'https://api.github.com/users/Kishan0507/repos',
                headers=headers,
                params={'per_page': 30, 'sort': 'updated'},
                timeout=25,
            )
            resp.raise_for_status()
        except http_requests.RequestException as e:
            return Response(
                {'detail': f'GitHub API error: {str(e)}'},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        repos = []
        for repo in resp.json():
            repos.append({
                'name': repo.get('name', ''),
                'description': repo.get('description', ''),
                'html_url': repo.get('html_url', ''),
                'language': repo.get('language', ''),
                'stargazers_count': repo.get('stargazers_count', 0),
                'forks_count': repo.get('forks_count', 0),
                'updated_at': repo.get('updated_at', ''),
                'topics': repo.get('topics', []),
            })

        return Response(repos)
