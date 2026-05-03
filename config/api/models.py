from django.db import models


class Profile(models.Model):
    """Personal profile information displayed on the Home and Contact pages."""
    name = models.CharField(max_length=100, default='Your Name')
    role = models.CharField(max_length=200, default='Developer')
    bio = models.TextField(blank=True, default='A passionate developer who loves building things.')
    college = models.CharField(max_length=200, blank=True, default='Your College')
    email = models.EmailField(blank=True, default='you@example.com')
    linkedin_url = models.URLField(blank=True, default='https://linkedin.com/in/yourprofile')
    github_username = models.CharField(max_length=100, default='Kishan0507')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Profile'


class Achievement(models.Model):
    """Achievements / awards displayed on the Achievements page."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField(blank=True, null=True)
    icon = models.CharField(max_length=10, default='🏆', help_text='Emoji icon')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-date']

    def __str__(self):
        return self.title


class Contribution(models.Model):
    """Open-source / community contributions displayed on the Contributions page."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True)
    date = models.DateField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-date']

    def __str__(self):
        return self.title
