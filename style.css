class FitnessTracker {
    constructor() {
        this.workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        this.todayStats = this.getTodayStats();
        this.weeklyData = this.getWeeklyData();
        this.chart = null;
        
        this.initElements();
        this.bindEvents();
        this.updateUI();
        this.updateDate();
        this.initChart();
    }

    initElements() {
        // UI Elements
        this.stepsCount = document.getElementById('stepsCount');
        this.caloriesCount = document.getElementById('caloriesCount');
        this.workoutsCount = document.getElementById('workoutsCount');
        this.waterCount = document.getElementById('waterCount');
        
        this.stepsProgress = document.getElementById('stepsProgress');
        this.caloriesProgress = document.getElementById('caloriesProgress');
        this.waterProgress = document.getElementById('waterProgress');
        this.stepsGoal = document.getElementById('stepsGoal');
        
        this.addWorkoutBtn = document.getElementById('addWorkoutBtn');
        this.workoutModal = document.getElementById('workoutModal');
        this.workoutForm = document.getElementById('workoutForm');
        this.closeBtn = document.querySelector('.close-btn');
        this.workoutsList = document.getElementById('workoutsList');
        
        this.actionBtns = document.querySelectorAll('.action-btn[data-type]');
        this.currentDate = document.getElementById('currentDate');
        this.progressChart = document.getElementById('progressChart').getContext('2d');
    }

    bindEvents() {
        // Quick action buttons
        this.actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.quickLog(e));
        });

        // Workout modal
        this.addWorkoutBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.workoutForm.addEventListener('submit', (e) => this.logWorkout(e));

        // Close modal on outside click
        this.workoutModal.addEventListener('click', (e) => {
            if (e.target === this.workoutModal) this.closeModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    updateDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.currentDate.textContent = now.toLocaleDateString('en-US', options);
    }

    getTodayStats() {
        const today = new Date().toDateString();
        const todayWorkouts = this.workouts.filter(w => 
            new Date(w.date).toDateString() === today
        );
        
        return {
            steps: 0,
            calories: todayWorkouts.reduce((sum, w) => sum + w.calories, 0),
            water: 0,
            workouts: todayWorkouts.length
        };
    }

    getWeeklyData() {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const weekly = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            const dayWorkouts = this.workouts.filter(w => 
                new Date(w.date).toDateString() === dateStr
            );
            weekly.push({
                date: dateStr,
                calories: dayWorkouts.reduce((sum, w) => sum + w.calories, 0),
                workouts: dayWorkouts.length
            });
        }
        return weekly;
    }

    updateUI() {
        this.stepsCount.textContent = this.formatNumber(this.todayStats.steps);
        this.caloriesCount.textContent = this.formatNumber(this.todayStats.calories);
        this.workoutsCount.textContent = this.todayStats.workouts;
        this.waterCount.textContent = this.formatNumber(this.todayStats.water) + 'ml';

        // Update progress bars
        this.updateStepsProgress();
        this.updateCaloriesProgress();
        this.updateWaterProgress();
        
        // Update workouts list
        this.updateWorkoutsList();
        
        // Update chart
        this.updateChart();
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    updateStepsProgress() {
        const progress = Math.min((this.todayStats.steps / 10000) * 251, 251);
        this.stepsProgress.style.strokeDashoffset = 251 - progress;
        this.stepsGoal.textContent = this.todayStats.steps >= 10000 ? '✅' : '10K';
    }

    updateCaloriesProgress() {
        const percentage = Math.min((this.todayStats.calories / 500) * 100, 100);
        this.caloriesProgress.style.width = percentage + '%';
    }

    updateWaterProgress() {
        const progress = Math.min((this.todayStats.water / 3000) * 188, 188);
        this.waterProgress.style.strokeDashoffset = 188 - progress;
    }

    quickLog(e) {
        const type = e.currentTarget.dataset.type;
        const amounts = {
            steps: 100,
            calories: 50,
            water: 250
        };
        
        if (type === 'steps') {
            this.todayStats.steps += amounts.steps;
        } else if (type === 'calories') {
            this.todayStats.calories += amounts.calories;
        } else if (type === 'water') {
            this.todayStats.water += amounts.water;
        }
        
        this.updateUI();
        this.showNotification(`${amounts[type === 'steps' ? 'steps' : type === 'calories' ? 'calories' : 'water']} ${type} added!`);
        
        // Animate button
        const btn = e.currentTarget;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = '', 150);
    }

    openModal() {
        this.workoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.workoutModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.workoutForm.reset();
    }

    logWorkout(e) {
        e.preventDefault();
        const formData = new FormData(this.workoutForm);
        const workout = {
            id: Date.now(),
            type: formData.get('exerciseType'),
            duration: parseInt(formData.get('duration')),
            calories: parseInt(formData.get('calories')),
            date: new Date().toISOString()
        };

        this.workouts.unshift(workout);
        this.todayStats.calories += workout.calories;
        this.todayStats.workouts += 1;
        
        this.saveData();
        this.updateUI();
        this.closeModal();
        this.showNotification(`✅ ${workout.type} logged! +${workout.calories} cal`);
    }

    updateWorkoutsList() {
        const today = new Date().toDateString();
        const recentWorkouts = this.workouts
            .filter(w => new Date(w.date).toDateString() === today)
            .slice(0, 5);

        if (recentWorkouts.length === 0) {
            this.workoutsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-dumbbell"></i>
                    <p>No workouts logged yet. Add your first workout!</p>
                </div>
            `;
            return;
        }

        this.workoutsList.innerHTML = recentWorkouts.map(workout => `
            <div class="workout-item">
                <div class="workout-info">
                    <h4>${workout.type}</h4>
                    <div class="workout-meta">
                        <span><i class="fas fa-clock"></i> ${workout.duration}min</span>
                        <span><i class="fas fa-fire"></i> ${workout.calories} cal</span>
                    </div>
                </div>
                <button class="workout-delete" onclick="app.deleteWorkout(${workout.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    deleteWorkout(id) {
        if (confirm('Delete this workout?')) {
            const workout = this.workouts.find(w => w.id === id);
            this.todayStats.calories -= workout.calories;
            this.todayStats.workouts -= 1;
            
            this.workouts = this.workouts.filter(w => w.id !== id);
            this.saveData();
            this.updateUI();
            this.showNotification('Workout deleted!');
        }
    }

    initChart() {
        const gradient = this.progressChart.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(72, 187, 120, 0.8)');
        gradient.addColorStop(1, 'rgba(72, 187, 120, 0.2)');

        this.chart = new Chart(this.progressChart, {
            type: 'line',
            data: {
                labels: this.weeklyData.map(d => {
                    const date = new Date(d.date);
                    return date.toLocaleDateString('en-US', { weekday: 'short' });
                }),
                datasets: [{
                    label: 'Calories Burned',
                    data: this.weeklyData.map(d => d.calories),
                    borderColor: '#48bb78',
                    backgroundColor: gradient,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#48bb78',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { color: '#666' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#666' }
                    }
                }
            }
        });
    }

    updateChart() {
        this.weeklyData = this.getWeeklyData();
        if (this.chart) {
            this.chart.data.labels = this.weeklyData.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
            });
            this.chart.data.datasets[0].data = this.weeklyData.map(d => d.calories);
            this.chart.update('none');
        }
    }

    saveData() {
        localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }

    showNotification(message) {
        // Simple notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(72, 187, 120, 0.4);
            z-index: 2000;
            font-weight: 600;
            transform: translateX(400px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize app
const app = new FitnessTracker();

// Add CSS for notification (inline)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Auto-save every 30 seconds
setInterval(() => {
    if (app) app.saveData();
}, 30000);
