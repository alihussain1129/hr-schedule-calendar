name: bug_report
about: Report an issue
title: ""
labels: bug
assignees: ""
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting this issue.
  - type: textarea
    id: description
    attributes:
      label: Problem description
      description: Describe the bug and how it affects the app.
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      placeholder: 1. Visit... 2. Click... 3. See error...
